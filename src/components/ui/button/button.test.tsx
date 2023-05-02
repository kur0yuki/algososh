import renderer from "react-test-renderer";
import {fireEvent, render as reactRenderer, screen} from '@testing-library/react'
import {Button} from "./button";

describe('Button Tests', () => {
    it('Button without text', () => {
        const button = renderer.create(<Button/>)
        let tree = button.toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('Button with text', () => {
        const button = renderer.create(<Button text={"Some text"}/>)
        let tree = button.toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('Blocked button', () => {
        const button = renderer.create(<Button text={"Some text"} disabled={true}/>)
        let tree = button.toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('Button with loader', () => {
        const button = renderer.create(<Button text={"Some text"} isLoader={true}/>)
        let tree = button.toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('OnClick Action works', () => {
        const fn = jest.fn(() => 5)
        reactRenderer(<Button text={"Some text"} onClick={fn}/>)

        fireEvent.click(screen.getByText("Some text"))
        expect(fn).toHaveBeenCalledTimes(1)
    })
})