import LinkContainer from "./components/LinkContainer"

function App() {  // first thing that gets rendered, which then...
  return( //... our LinkContainer is rendered due to our import up above
    <div> 
      <LinkContainer /> 
    </div>
  )
}

export default App