import renderer from "react-test-renderer";
import {Circle} from "./circle";
import {ElementStates} from "../../../types/element-states";

describe('Circle tests', () =>{
   it('No letter', () => {
      const circle = renderer.create(<Circle />)
      let tree = circle.toJSON()
      expect(tree).toMatchSnapshot()
   })
   it('With letter', () => {
      const circle = renderer.create(<Circle letter={"abc"}/>)
      let tree = circle.toJSON()
      expect(tree).toMatchSnapshot()
   })
   it('With head', () => {
      const circle = renderer.create(<Circle letter={"abc"} head={"head"}/>)
      let tree = circle.toJSON()
      expect(tree).toMatchSnapshot()
   })
   it('With head as react element', () => {
      const circle = renderer.create(<Circle letter={"abc"} head={<Circle letter={"h"}/>}/>)
      let tree = circle.toJSON()
      expect(tree).toMatchSnapshot()
   })
   it('With tail', () => {
      const circle = renderer.create(<Circle letter={"abc"} tail={"tail"}/>)
      let tree = circle.toJSON()
      expect(tree).toMatchSnapshot()
   })
   it('With tail as react element', () => {
      const circle = renderer.create(<Circle letter={"abc"} tail={<Circle letter={"t"}/>}/>)
      let tree = circle.toJSON()
      expect(tree).toMatchSnapshot()
   })

   it('With index', () => {
      const circle = renderer.create(<Circle letter={"abc"} index={3}/>)
      let tree = circle.toJSON()
      expect(tree).toMatchSnapshot()
   })
   it('With isSmall property', () => {
      const circle = renderer.create(<Circle letter={"abc"} isSmall={true}/>)
      let tree = circle.toJSON()
      expect(tree).toMatchSnapshot()
   })

   it('In default state', () => {
      const circle = renderer.create(<Circle letter={"abc"} state={ElementStates.Default}/>)
      let tree = circle.toJSON()
      expect(tree).toMatchSnapshot()
   })
   it('In changing state', () => {
      const circle = renderer.create(<Circle letter={"abc"} state={ElementStates.Changing}/>)
      let tree = circle.toJSON()
      expect(tree).toMatchSnapshot()
   })
   it('In modified state', () => {
      const circle = renderer.create(<Circle letter={"abc"} state={ElementStates.Modified}/>)
      let tree = circle.toJSON()
      expect(tree).toMatchSnapshot()
   })

})