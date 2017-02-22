var tag = 0;
var flg = 0;
function flag(){
	if(flg == 0){flg = 1}
	else{ flg = 0 }
	return flg;
	}
var p1 = new Array(5);
var k = 0;
function ply1(idp1){
	p1[k] = idp1;
	win(p1,'p1');
	 k++;
	if(k>=5){
		if(tag == 0){
		alert('Match Draw !!!')
		}
		}
	}
var p2 = new Array(4);
var j = 0;
function ply2(idp2){ 
	p2[j] = idp2;
	win(p2,'p2');
j++;
}
var x = 0;
/*function rotate(){
	getelm = $('#mb').children(this);
	
	 getprop = $(getelm[x]).prop('disabled'); 
	if(flg == 1){
	if(getprop != true){
		$(getelm[x]).css({'background-position':'0px 0px'});//x++;
	}
	
		}
	else{ 
	if(getprop != true){ 
	$(getelm[x]).css({'background-position':'-94px 0px'});//x++;
	}
		}
		
			setTimeout(function(){
				getprop1 = $(getelm[x]).prop('disabled');
	if(getprop1 != true){
			$(getelm[c]).css({'background-position':'89px 0px'});x++;
	}rotate();
		},500);
	
		}*/
function rand(elm){
	
var setval = elm.sort(function() {return 0.5 - Math.random()});
return setval[0];
	}
function auto(){
	//rotate();
		//get = $('#mb').children();
		getelm = $('#mb').children(this);
		getrand = rand(getelm);
		getprop = $(getrand).prop('disabled');
		if(getprop == true){
		//alert(rand().id);
		auto();
			}
		else{
		 $(getrand).trigger('click');
		//alert(getrand.id);
		}
	
	}
function ai(n1,n2){ 
	getn1 = n1.length;
	getn2 = n2.length;
	
	var diff;
	
	//for(z=0;z<=getn1;z++){set = ['b1','b2','b3','b4','b5','b6','b7','b8','b9']
//diff = $().filter(set[z]).get();
if(n1[0] == 'b1'){ elms = ['b2','b5','b4'];
	getrand = rand(elms);alert(n1[0]);
	getprop = $(getrand).prop('disabled');
	if(getprop != true){  $('#'+getrand).trigger('click'); }
	else{ai(n1,n2);}
	//}
	}
	}
function win(v1,v2){
	set = [['b1','b2','b3'],['b1','b4','b7'],['b1','b5','b9'],['b2','b5','b8'],['b3','b6','b9'],['b4','b5','b6'],['b7','b8','b9'],['b3','b5','b7']];
	var diff;
	for(z=0;z<=7;z++){
	diff = $(set[z]).filter(v1).get();
	if(diff[0] && diff[1] && diff[2]){alert(v2+'wins the match!!!\nWith - '+diff);tag = 1;
	window.location.reload();
	get = $('#mb').children();
	$(get).prop('disabled',true);
	}
	}
	}
$(document).ready(function(e) {
    for(i=1;i<=9;i++){
	$('#mb').append('<input type=button id=b'+i+' value />');
		$('#b'+i).click(function(e) {
            if(flag() == 1){ ply1(this.id);
				$(this).css({'background-position':'-94px 0px'});$(this).prop('disabled',true);
				}
				else { ply2(this.id);
				$(this).css({'background-position':'0px 0px'});$(this).prop('disabled',true);
					}
		});
			$('#b'+i).mouseover(function(e) {
            if(flg == 1){ 
					$(this).css({'background-position':'0px 0px'});
				}
				else if(flg == 0) {
			$(this).css({'background-position':'-94px 0px'});
					}
					
		});
			$('#b'+i).mouseout(function(e) {
          
			$(this).css({'background-position':'89px 0px'});
					
					
		});
		
		/*end-for*/}
		
		$('#test').click(function(e) {
            auto();
        });
		$('#test1').click(function(e) {
		ai(p1,p2);
		});
});