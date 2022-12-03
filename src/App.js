import React, {useState} from 'react';
import './App.css';
import { Emoji, EmojiStyle } from 'emoji-picker-react';
import img from './img.jpeg';
import SortingVisualizer from './SortingVisualizer';


function App() {
  // const isIntitalContent = true;
  // const [content, setContent] = useState(isIntitalContent);
  // return (
  //   <>
  //   {content && <InitialContent content = {content} setContent={setContent} />} 
  //   {!content && <SecondaryContent content = {content} setContent={setContent}/>}
  //   </>
  // );

  return <SortingVisualizer/>
}


const SecondaryContent = ({content, setContent}) => (
  <div className='App'>
    <div className='App-header'>
      {`Here's one of our favourite images`}
      {<img src={img} alt='Our Img' height={480} width = {360} onClick = {() => setContent(!content)}/>}
    </div>
  </div>
);

const InitialContent = ({content, setContent}) => (
  <div className="App">
    <header className="App-header">
      {`I love you so much Sweetyyyy`} 
      {
        <a href = '/#' onClick = {() => setContent(!content)}>
          <Emoji emojiStyle={EmojiStyle.APPLE} unified ='1f618' /> 
        </a>
      }
    </header>
  </div>
);

export default App;
