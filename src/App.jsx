import { useEffect, useState, useRef } from "react";
import { shuffle } from "lodash-es";

import './App.css'

function App() {
  const [list, setList] = useState(Array(9).fill(0).map((cur, index) => ({
    key: index +1,
    firstX: 0,
    firstY: 0,
    lastX: 0,
    lastY: 0
  })));

  useEffect(() => {
    const { top: elTop, left: elLeft } = document.querySelector('.list').getBoundingClientRect()

    document.querySelectorAll('li').forEach((cur, index) => {
      const { left, top } = cur.getBoundingClientRect();
      list[index].firstX = Math.floor(left - elLeft);
      list[index].firstY = Math.floor(top - elTop);
    })
  }, []);

  const handleShuffle = () => {
    const _list = shuffle(list)
    setList(_list)

    setTimeout(() => {
      const { top: elTop, left: elLeft } = document.querySelector('.list').getBoundingClientRect()

      document.querySelectorAll('li').forEach((cur, index, arr) => {
        const { left, top, width, height } = cur.getBoundingClientRect();
        const item = _list[index]
        _list[index].lastX = Math.floor(left - elLeft);
        _list[index].lastY = Math.floor(top - elTop);

        console.log(item, cur.getBoundingClientRect(), cur);

        setTimeout(() => {
          cur.style.cssText = `
            position: absolute;
            width: ${width}px;
            height: ${height}px;
            left: ${Math.abs(item.firstX)}px;
            top: ${Math.abs(item.firstY)}px;
            transform: translate(${item.lastX - item.firstX}px, ${item.lastY - item.firstY}px);
            transition: .3s;
          `

          cur.ontransitionend = () => {
            cur.removeAttribute('style');
            item.firstX = item.lastX;
            item.firstY = item.lastY;
          }
        })
      });
    })
  }

  return (
    <div className="App">
      <button onClick={handleShuffle}>shuffle</button>

      <ul className="list">
        {list.map(cur => (
          <li key={cur.key} data-key={cur.key}>{cur.key}</li>
        ))}
      </ul>
    </div>
  )
}
export default App
