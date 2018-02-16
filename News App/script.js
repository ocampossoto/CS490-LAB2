
//main function to run
function search(){
    //check if anything is textboxes
    //send to get_data function
    if(!$(topic).val() && !$(source).val()){
        //do nothing
    }
    else if($(topic).val() && $(source).val()){
        get_data($(source).val(), $(topic).val());
    }
    else if($(source).val()){
        get_data($(source).val(), null);

    }
    else if($(topic).val()){
        get_data(null, $(topic).val());
    }
}

//create the url to look up the news articles
//submit and get results running the add to page function
function get_data(source, topic){
    var url = 'https://newsapi.org/v2/everything?'; //start of url
    //check if source or topic is filled out or both
    if(topic != null && source !== null){
        url = url + 'q=' + topic;
        url += 'sources='+ source;
    }
    else if(source !=null){
        url += 'sources='+ source;
    }
    else if(topic != null){
        url = url + 'q=' + topic;

    }

    //add key
    url += '&apiKey=f5a0b812dcdb4ad3aaab278da0d36b18';

    //request url
    var req = new Request(url);

    //get request data
    fetch(req).then(function(response) {
        //console.log(response); //log data (for debugging)

        //get values of response
        var values = response.json();
            //go through the response
            //add to page
            values.then(function(x){
                add_to_page(x.articles);

            })
        })

}

function add_to_page(x){
    //console.log(x); //debugging

    //check if we have any previous items
    //if so delete them
    if(document.getElementById('results') != null){
        document.getElementById('results').remove();
    }

    //create outer div with id, for easy removal
    var out = document.createElement('div');
    out.setAttribute('id',"results")

    //loop through results and add to page
    x.forEach(function(value){
        //don't add things without an image
        if(value["urlToImage"]!=null){
            // crate div article container
            var div =document.createElement("div");
            div.setAttribute('id',"article")

            //create header
            var head = document.createElement("h2");

            //add title
            var dat = document.createTextNode(value["title"]);
            head.appendChild(dat);
            div.appendChild(head)

            //create publish date info
            //add to page
            var date = document.createElement('p');
            var dat = document.createTextNode( 'Published At: '+ value['publishedAt']);
            date.appendChild(dat);
            div.appendChild(date);

            //add link for image
            var img_link = document.createElement('a');
            img_link.href = value['url'];
            img_link.target = "_blank";

            //add image
            var images = document.createElement("img");
            images.src = value["urlToImage"];
            img_link.appendChild(images);
            div.appendChild(img_link);

            //add to outer div
            out.appendChild(div);
        }

    })
    //add to page
    document.body.appendChild(out);
}





