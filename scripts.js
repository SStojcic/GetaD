  const app = document.getElementById('root');
  const container = document.createElement('div');
  container.setAttribute('class', 'container');
  app.appendChild(container);
  var request = new XMLHttpRequest();
  const proxyUrl = "http://cors-anywhere.herokuapp.com/"
  request.open('GET', proxyUrl+'http://newsapi.org/v2/top-headlines?country=us',true);
  request.setRequestHeader("X-API-KEY","21380750dbd649d483410454f4a6299d");
  request.onload = function () {
  var data = JSON.parse(this.response);
  const articles=data.articles;
  if (request.status >= 200 && request.status < 400) {
      articles.forEach(article => {
	  var d = new Date(article.publishedAt);
	  var time2=d.toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'});
	  time2.replace(/:\d+ /, ' ');
          const card = document.createElement('article');
          card.setAttribute('class', 'card');
	  const aImg=document.createElement('a');
	  aImg.href=article.url;
	  const figure=document.createElement('figure');
          const img = document.createElement('img');
          img.src = article.urlToImage;
	  img.alt=article.title;
	  figure.appendChild(img);
	  aImg.appendChild(figure);
	  const contentWrapper=document.createElement('div');
	  contentWrapper.setAttribute('class','content-wrapper');
	  const h1=document.createElement('h1');
          const a = document.createElement('a');
          a.textContent = article.title;
          a.href=article.url;
	  h1.appendChild(a);
          const p = document.createElement('p');
	      
	  if(article.description)
          article.description = article.description.substring(0, 1000);
	      
          p.textContent = article.description;
	  const p2 = document.createElement('p');
	  p2.setAttribute('class','pTime');
          p2.textContent=article.source.name;
          const timeTag = document.createElement('time');
	  timeTag.setAttribute('class','timeField');
	  timeTag.textContent=time2;
          p2.appendChild(timeTag);

	  contentWrapper.appendChild(h1);
	  contentWrapper.appendChild(p);

          card.appendChild(aImg);
          card.appendChild(contentWrapper);
	  card.appendChild(p2);	
	  container.appendChild(card);
  });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Error occured!`;
    app.appendChild(errorMessage);
  }
}
request.send();
