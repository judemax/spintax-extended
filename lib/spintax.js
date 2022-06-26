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
		if(typeof data==='string')
			data={type:'text',value:data};
		if(Array.isArray(data))
			return data.reduce((a,v)=>a+Spintax.process(v),'');
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
	/**
	 * Returns some random unspin text
	 * @returns {string} some random unspin text
	 */
	unspin(){
		return Spintax.process(this.data);
	}
	static _count(data){
		if(!data || typeof data==='string')
			return 1;
		if(Array.isArray(data))
			return data.reduce((a,v)=>a*Spintax._count(v),1);
		if(data.type==='text')
			return 1;
		if(data.count)
			return data.count;
		if(data.type==='or')
			data.count=data.values.reduce((a,v)=>a+Spintax._count(v),0);
		if(data.type==='and')
			data.count=Spintax._count(data.separator)*
				data.values.reduce((a,v,i)=>a*Spintax._count(v)*(i+1),1);
		return data.count;
	}
	/**
	 * Count of all possible variations of the spintax
	 * @returns {int} a count of variations
	 */
	countVariations(){
		return Spintax._count(this.data);
	}
	static _permute(a){
		if(a.__permute)
			return a.__permute;
		let b=a.slice();
		let out=[b.slice()];
		let c=new Array(b.length).fill(0);
		for(let k,i=0;i<b.length;++i)
		{
			if(c[i]>=i)
			{
				c[i]=0;
				continue;
			}
			k=i%2&&c[i];
			[b[i],b[k]]=[b[k],b[i]];
			out.push(b.slice());
			++c[i];
			i=0;
		}
		a.__permute=out;
		return out;
	}
	static _fullProcess(data,I){
		if(!data)
			return '';
		if(typeof data==='string')
			data={type:'text',value:data};
		let C=Spintax._count(data);
		I=I%C;
		if(Array.isArray(data))
			return data.reduce((a,v)=>{
				let c=Spintax._count(v);
				v=Spintax._fullProcess(v,I%c);
				I=Math.floor(I/c);
				return a+v;
			},'');
		if(data.type==='text')
			return data.value;
		if(data.type==='or')
		{
			let s=0;
			for(let i=0;i<data.values.length;++i)
			{
				let c=Spintax._count(data.values[i]);
				if(I<s+c)
					return Spintax._fullProcess(data.values[i],I-s);
				s+=c;
			}
			return Spintax._fullProcess(data.values[data.values.length-1],I-s);
		}
		if(data.type==='and')
		{
			let sc=Spintax._count(data.separator);
			let separator=Spintax._fullProcess(data.separator,I%sc);
			I=Math.floor(I/sc);
			let c=data.values.reduce((a,v,i)=>a*Spintax._count(v),1);
			let sub=Spintax._permute(data.values)[Math.floor(I/c)];
			return sub.map(l=>Spintax._fullProcess(l,I%c)).join(separator);
		}
	}
	/**
	 * Returns text from the full unspin list by index. Function NOT generated the full list to get result from array.
	 * @param {int} i Index of unspin text in the full list
	 * @returns {string} unspin text
	 */
	unspinByIndex(i){
		return Spintax._fullProcess(this.data,i);
	}
	/**
	 * Returns a full unspin list
	 * @returns {Array} a full unspin list
	 */
	fullUnspinList(){
		let out=[];
		let cv=this.countVariations();
		for(let i=0;i<cv;++i)
			out.push(this.unspinByIndex(i));
		return out;
	}
	/**
	 * Returns a random unspin list
	 * @param {int} size the list's length
	 * @param {bool} unique is unique list
	 * @returns {Array} a random unspin list
	 */
	randomUnspinList(size,unique=false){
		if(size<=0)
			return [];
		if(unique)
			return Spintax.shuffle(this.fullUnspinList()).slice(0,size);
		let out=[];
		for(let i=0;i<size;++i)
			out.push(this.unspin());
		return out;
	}
	/**
	 * Check correction of the spintax
	 * @returns {bool} is spintax correct
	 */
	isCorrect(){
		if(!/(^|[^\\])[{\[]/.test(this.rawtext)) //just text
			return true;
		let p=0,lastOB=[];
		for(let i=0;i<this.rawtext.length;++i)
		{
			if(['[','{'].includes(this.rawtext[i]))
			{
				if(i>0 && this.rawtext[i-1]==='\\')
					continue;
				lastOB.push(this.rawtext[i]);
				++p;
				continue;
			}
			if([']','}'].includes(this.rawtext[i]))
			{
				if(i<=0)
					return false;
				if(this.rawtext[i-1]==='\\')
					continue;
				let lOB=lastOB.pop();
				if(!lOB || (this.rawtext[i]!==']' && lOB==='[') || (this.rawtext[i]!=='}' && lOB==='{'))
					return false;
				--p;
				if(p<0)
					return false;
				continue;
			}
		}
		return p===0;
	}
	/**
	 * Returns some random unspin text
	 * @param {string} text 
	 * @returns {string} some random unspin text
	 */
	static unspin(text){
		return new Spintax(text).unspin();
	}
	/**
	 * Count of all possible variations of the spintax
	 * @param {string} text 
	 * @returns {int} a count of variations
	 */
	static countVariations(text){
		return new Spintax(text).countVariations();
	}
	/**
	 * Returns text from the full unspin list by index. Function NOT generated the full list to get result from array.
	 * @param {string} text 
	 * @param {int} i Index of unspin text in the full list
	 * @returns {string} unspin text
	 */
	static unspinByIndex(text,i){
		return new Spintax(text).unspinByIndex(i);
	}
	/**
	 * Returns a full unspin list
	 * @param {string} text 
	 * @returns {Array} a full unspin list
	 */
	static fullUnspinList(text){
		return new Spintax(text).fullUnspinList();
	}
	/**
	 * Returns a random unspin list
	 * @param {string} text 
	 * @param {int} size the list's length
	 * @param {bool} unique is unique list
	 * @returns {Array} a random unspin list
	 */
	static randomUnspinList(text,size,unique=false){
		return new Spintax(text).randomUnspinList(size,unique);
	}
	/**
	 * Check correction of the spintax
	 * @param {string} text 
	 * @returns {bool} is spintax correct
	 */
	static isCorrect(text){
		return new Spintax(text).isCorrect();
	}
};

module.exports=Spintax;