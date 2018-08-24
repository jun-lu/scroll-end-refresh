
/**
 
	滑动加载更多
	let a = new ScrollEndPull(threshold, ()=>{
		return new Promise((resolve, reject)=>{
			//请求ajax
			ajax("get data", ()=>{
				//插入数据...
				resolve();//继续监听
			}, ()=>{
				reject();//没有数据了，销毁监听
			})
		});
	});
	

*/

export default class ScrollEndPull {
	constructor(threshold, onEndPull){

		//阈值
		this.threshold = threshold || 200;
		this.isEventListener = true;
		this.onEndPull = onEndPull || this.onEndPull;

		this.scrollHandler = this.scrollHandler.bind(this);

		window.addEventListener('scroll', this.scrollHandler, false);
		window.addEventListener('resize', this.scrollHandler, false);
	}

	scrollHandler(){

		//是否还处于监听状态
		if(!this.isEventListener){
			return ;
		}

		let bodyRect = document.body.getBoundingClientRect();
		let availHeight = window.screen.availHeight;
		let scrollTop = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
		
		if(scrollTop + availHeight + this.threshold > bodyRect.height){
			
			this.isEventListener = false;

			this.onEndPull(()=>{
				this.isEventListener = true;
			}, ()=>{
				this.destroy();
			});

		}

	}

	stop(){
		this.isEventListener = false;
	}

	start(){
		this.isEventListener = true;
	}
	//销毁
	destroy(){
		this.isEventListener = false;
		window.removeEventListener('scroll', this.scrollHandler, false);
		window.removeEventListener('resize', this.scrollHandler, false);
	}
	
}