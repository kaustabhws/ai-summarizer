import './App.css'
import Article from './Article/Article';
import Hero from './Hero/Hero';

const App = () => {

  return (
    <main>
      <div className='w-screen min-h-screen fixed -z-10 flex justify-center py-32 px-6 gradient' />

      <div>
        <Hero />
        <Article />
      </div>
    </main>
  )
}

export default App;