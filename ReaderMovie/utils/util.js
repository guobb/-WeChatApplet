function convertToStarsArray(stars){
    var num = stars.toString().substring(0,1);
    var array = [];
    for(var i=1; i<=5; i++){
        if(i<num){
            array.push(1);
        }
        else{
            array.push(0);
        }
    }
    return array;
}

 function http(url, callBack){
    
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      header: {
        "Content-Type":"application/xml"
      },
      success: function(res){
        callBack(res.data);
      },
      fail: function() {
        // fail
        console.log('调用失败')
      },
      complete: function() {
        // complete
      }
    })

  }

module.exports = {
    convertToStarArray: convertToStarsArray,
    http:http
}