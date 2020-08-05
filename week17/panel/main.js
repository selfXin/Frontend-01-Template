
import {create,Text,Wrapper} from './reactCreateElement.js';
import {ListView} from './ListView.js';
// import {Panel} from './Panel.js';


// let panel = <Panel title='这是一个标题'>
// 		<span title='标题1'>测试内容1</span>
// 		<span title='标题2'>测试内容2</span>
// 	</Panel>

// panel.mountTo(document.querySelector('#container'));

// window.panel = panel;


let data = [
		{title:'猫1',src:'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg'},
		{title:'猫2',src:'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg'}
    ];


let listView = <ListView data={data}>
			{(record) => <figure>
				<img src={record.src}/>
				<figcaption>{record.title}</figcaption>
			</figure>}
</ListView>

listView.mountTo(document.querySelector('#container'));



