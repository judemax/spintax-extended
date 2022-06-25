/*
 * Copyright (c) 2022 Jude Max <judemaxgthb@gmail.com>
 */

class Spintax{
	constructor(text){
		this.rawtext=text;
		this.data=Spintax.parse(text);
	}
	static parse(text){
		if(!/(^|[^\\])[{\[]/.test(text))
			return {type:'text',value:text.replace(/\\([\[{}\]|+])/g,'$1')};
		const out=[];
		let p=0,st=-1,en=-1,type='',separator='',values=[],os=-1;
		for(let i=0;i<text.length;++i)
		{
			if(['[','{'].includes(text[i]))
			{
				if(i>0 && text[i-1]==='\\')
					continue;
				++p;
				if(p>1)
					continue;
				if(i>en+1)
					out.push(Spintax.parse(text.slice(en+1,i)));
				st=i;
				type=text[i]==='{'?'or':'and';
				continue;
			}
			if(p===1 && text[i]==='+' && text[i-1]!=='\\' && separator==='')
			{
				if(i===st+1 && os<0)
					os=i;
				else if(os>0)
				{
					separator=Spintax.parse(text.slice(os+1,i));
					st=i;
				}
				continue;
			}
			if(p===1 && text[i]==='|' && text[i-1]!=='\\')
			{
				values.push(Spintax.parse(text.slice(st+1,i)));
				st=i;
				continue;
			}
			if([']','}'].includes(text[i]) && i>0 && text[i-1]!=='\\')
			{
				if(p<=0)
					continue;
				--p;
				if(p>0)
					continue;
				values.push(Spintax.parse(text.slice(st+1,i)));
				out.push({type,separator,values});
				separator='',values=[],os=-1;
				en=i;
				continue;
			}
		}
		if(values.length>0)
			out.push({type,separator,values});
		if(p===0 && en>0 && en<text.length-1)
			out.push(Spintax.parse(text.slice(en+1)));
		return out;
	}
	static RND(a){
		return a[Math.floor(a.length*Math.random())];
	}
	static shuffle(a){
		a=a.slice();
		for(let j,i=a.length-1;i>=0;--i)
		{
			j=Math.floor((i+1)*Math.random());
			[a[i],a[j]]=[a[j],a[i]];
		}
		return a;
	}
	static process(data){
		if(!data)
			return '';
		if(Array.isArray(data))
			return Spintax.join(data);
		if(data.type==='text')
			return data.value;
		if(data.type==='or')
			return Spintax.process(Spintax.RND(data.values));
		if(data.type==='and')
			return Spintax.shuffle(data.values).map(Spintax.process).join(Spintax.process(data.separator));
	}
	static join(data){
		if(!data)
			return '';
		if(typeof data==='string')
			data={type:'text',value:data};
		if(!Array.isArray(data))
			data=[data];
		return data.reduce((a,v)=>a+Spintax.process(v),'');
	}
	unspin(){
		return Spintax.join(this.data);
	}
	static unspin(text){
		let s=new Spintax(text);
		return s.unspin();
	}
};

module.exports=Spintax;