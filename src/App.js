import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
    let tpl = ''
let match = ''
const cache = {}
// 匹配模板id
const idReg = /[\s\W]/g
// 匹配JavaScript语句或变量
const tplReg = /< % =?\s*([^%>]+?)\s*%>/g
// 匹配各种关键字
const keyReg = /(for|if|else|switch|case|break|{|})/g

const add = (str, result, js) => {
	str = str.replace(/[\r\n\t]/g, '')
		.replace(/\\/g, '\\\\')
		.replace(/'/g, "\\'")
	result += js ? str.match(keyReg) ? `${str}` : `result.push(${str});` : `result.push('${str}');`
	return result
}

const tmpl = (str, data) => {
	let cursor = 0
	let result = 'let result = [];'
        // 如果是模板字符串，会包含非单词部分（<, >, %,  等）；如果是id，则需要通过getElementById获取
	if (!idReg.test(str)) {
		tpl = document.getElementById(str).innerHTML
		// 缓存处理
		if (cache[str]) {
			return cache[str].apply(data)
		}
	} else {
		tpl = str
	}
	// 使用exec函数，动态改变index的值
	while (match = tplReg.exec(tpl)) {
		result = add(tpl.slice(cursor, match.index), result) // 匹配HTML结构
		result = add(match[1], result, true)		     // 匹配JavaScript语句、变量
		cursor = match.index + match[0].length		     // 改变HTML结果匹配的开始位置
	}
	result = add(tpl.slice(cursor), result)		             // 匹配剩余的HTML结构
	result += 'return result.join("")'
	let fn = new Function(result)		                     // 转成可执行的JS代码
	if (!cache[str] && !idReg.test(str)) {                       // 只有传入的是id的情况下才缓存模板
		cache[str] = fn
	}
	return fn.apply(data)		                              // apply改变函数执行的作用域
}

           </p>
      </div>
    );
  }
}

export default App;
