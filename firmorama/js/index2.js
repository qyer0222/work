(function(window){
	var str;
	var num;
	var arrT;
	var arrL;
	var con_body;
	var Width;
	var space;
	var cell;
	var Outerwidth;
	var sUrl;
	var loader;
	var iPage;
	var onOff;
	var height;
	function int(){
		str = '';
		num = 0;
		height = $('#con_head').offset().top;
		arrT = [];//记录高度
		arrL = [];//记录宽度
		con_body = $('#con_body');
		Width = 200;//设置单个图片的宽度
		space = 10;//空格间距
		cell = 0;//设置列数
		Outerwidth = Width+space;//单个图片包括间距的宽度
		sUrl = 'http://www.wookmark.com/api/json/popular?callback=?';//图片的地址
		loader = $('#loader');
		iPage = 0;
		onOff = true;
		//create();
		mover();
		waterfall();
		
		/*$(window).on('resize', function(){
//			var cells = cell;
			setcell();//重新计算变化后的列
			arrT = [];//清空
			arrL = [];//清空
			for(var i=0;i<cell;i++){
				arrT[i] = 0;//记录图片高度
				arrL[i] = Outerwidth * i;//记录图片的宽度
			}
			con_body.find('img').each(function(){
				var index = short();
					//求出图片的left
//				$(this).css({
//					top:arrT[index],//固定的是200
//					left:arrL[index]//根据图片换算的结果
//				})
				//移动动画
				$(this).animate({
					top:arrT[index],//固定的是200
					left:arrL[index]//根据图片换算的结果
				},1000)
				arrT[index] += $(this).height() + 10;
			})
			
		})*/
	}
	
	/*function create(){
		for(var i=0;i<20;i++){
			num++;
			str+='<li><a href="#"><div style="display:none"><span>_</span><h2>CERVEJA ZEIT</h2><p style="width: 230px;">JANEIRO 2016</p><h3></h3><p style="width: 230px;"></p></div><img src=img/'+num+'.png></a></li>'
		}
		$('#con_body')[0].innerHTML = str;
	}*/
	function short(){
		var mark = arrT[0];
		var index = 0;//记录位置
		for(var i=1;i<arrT.length;i++){
			if(arrT[i]<mark){
				mark = arrT[i];
				index = i;
			}
		}
		return index;
	}

	window.onscroll = function(){
		
			//判断header是否跟随
			if(window.pageYOffset>=height){
				$('#con_head').css('border-top','3px solid #0ee172');
				$('#con_head ul').css('border-top','none');
				$('#con_head').addClass('flofix');
			}else{
				if($('#con_head')[0].className){
					$('#con_head').removeClass('flofix');
					$('#con_head').css('border-top','none');
				}
			}
			//判断最短的长度是否大于可视区+滚动条top值
			var index = short();
			console.log(arrT[short()],short)
			var iH =  $(window).scrollTop()+$(window).innerHeight();
			if(arrT[index]+50<iH){
				getdata();
			}
		};
	
	function mover(){
		$('#con_body li').mouseover(function(){
			$(this).find('div').css({
				display:'block',
				opacity: '1'
			}).next().css('opacity','0.3');
		}).mouseout(function(){
			$(this).find('div').css({
				display:'none',
				opacity: '1'
			}).next().css('opacity','1');
		})
	}
	
	function setcell(){
		cell = Math.floor(window.innerWidth/Outerwidth);
		con_body.css('width',cell*Outerwidth-10);
	}
	
	function waterfall(){
		setcell();
		for(var i=0;i<cell;i++){
			arrT[i] = 0;//记录图片高度
			arrL[i] = Outerwidth * i;//记录图片的宽度
		}
			getdata();
	}

	function getdata(){
			/*$.getJSON( url ,[ data ] ,[ success(data, textStatus, jqXHR) ] )
			url是必选参数，表示json数据的地址；
			data是可选参数，用于请求数据时发送数据参数；
			success是可参数，这是一个回调函数，用于处理请求到的数据。
			function(data)是获取到的数据*/
			if(!onOff){
				return
			}
			
			onOff = false;
			iPage++;
			$.getJSON(sUrl,{page:iPage},function(data){
					loader.show();
				//下面是用for循环遍历的函数生成的图片
				/*for(var i=0;i<20;i++){
					read(data[i]);
				}
				 function read(data) {
					var Img = $('<img />');
					//obj里面的属性是图片的高度，用这个高度乘以当前图片的宽度除以obj属性里面的图片宽度，经过比例的换算就会求出当前所有图片的height
					var Height = data.height * (Width / data.width);
					//求出了图片的宽度
					Img.css({
						width:Width,//固定的是200
						height:Height//根据图片换算的结果
					})
					var index = short();
					//求出图片的left
					Img.css({
						top:arrT[index],//固定的是200
						left:arrL[index]//根据图片换算的结果
					})
					arrT[short()]+= Height+10;
					con_body.append(Img);//可以插入了，但是发现最长的会挤开其他的，应该先在最短的后面添加
					var objImg = new Image();//新建一个函数
					objImg.onload = function(){//防止全部加载出来
						Img.attr('src', this.src);//获取img的属性值就是src
						
					}
					objImg.src = data.preview;
					//停止加载动画
					setTimeout(function() {
						$('#loader').hide();
					},1000)
					onOff = true;
				};*/
				
				//下面是用each方法遍历函数获得的数值
				$.each(data, function(index, obj) {
					var Img = $('<img />');
					//obj里面的属性是图片的高度，用这个高度乘以当前图片的宽度除以obj属性里面的图片宽度，经过比例的换算就会求出当前所有图片的height
					var Height = obj.height * (Width / obj.width);
					//求出了图片的宽度
					Img.css({
						width:Width,//固定的是200
						height:Height//根据图片换算的结果
					})
					var index = short();
					//求出图片的left
					Img.css({
						top:arrT[index],//固定的是200
						left:arrL[index]//根据图片换算的结果
					})
					arrT[short()]+= Height+10;
					con_body.append(Img);//可以插入了，但是发现最长的会挤开其他的，应该先在最短的后面添加
					var objImg = new Image();//新建一个函数
					objImg.onload = function(){//防止先出图片还没有出结构
						Img.attr('src', this.src);//获取img的属性值就是src
					}

					objImg.src = obj.preview;
					//停止加载动画
					setTimeout(function() {
						$('#loader').hide();
					},1000)
					onOff = true;
				});
			})
		}

		
		//窗口发生改变的时候图片进行自动填充
		
	window.int = int;
})(window)
