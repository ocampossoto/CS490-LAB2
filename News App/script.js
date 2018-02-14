

function search(){
    if(!$(topic).val() && !$(source).val()){
        var data = get_data('abc-news');
        console.log(data);
        console.log('eh');
    }
    else if($(topic).val() && $(source).val()){
        console.log('both');
    }
    else if($(source).val()){
        console.log($(source).val());
    }
    else if($(topic).val()){
        console.log($(topic).val());
    }
}


function get_data(source){
    var url = 'https://newsapi.org/v2/everything?' +
        'sources="'+ source +
        'sortBy=' + topic +
        '"&apiKey=f5a0b812dcdb4ad3aaab278da0d36b18';
    var r = [];
    var req = new Request(url);
    fetch(req).then(function(response) {
        var values = response.json();
            values.then(function(x){
                r = (x.articles);
                console.log(r);
                return r;

            })
        })

}





