# Allocine scrapper

## Introduction

Allocine is a French cinema company.
On their website you can book places for movies or add comments on the movies you have seen

## Projet structure
````
Allocine-Scrapper
 |__(Corpus)
 |
 |__Label 
 |  |__first_label.txt
 |  |__label.txt
 |  |__second_label.txt
 |
 |__crawler**
 |  |__compteur.txt
 |  |__first_crawl.js
 |  |__second_crawl.js
 |
 |__lib
 |  |__crawling
 |  |  |__find_all_comment_page.js
 |  |  |__parser.js    
 |  |  |__save.js
 |  |
 |  |__scraping
 |  |  |__extract_comments_page.js
 |  |  |__extract_id.js
 |  |  |__extract_id_page.js
 |  |  |__parse.js
 |  |
 |  |__asyncloop.js
 |  |__extract_links.js
 |  |__get_http.js
 |  |__waitFor.js
 |__scrapper
    |__initialize.js    
    |__scraping.js
````
For the corpus file go to the next section.

Label File contain the list of urls to get comments.

In the crawler file , there are the script for crawl the urls.

The lib file contain the function for each script and the subfile crawler and scrapper contains the specifics functions for each.

Scraper file contain the script for scrap the comments with url , **before execute the scrap , execute the initialize**.

When there is an error , the script continu and write the error in Error_logs.txt with this format : SCRAPING[ERROR]${id}/${id_page} | ${e}

where $id = the id of movie , $id_page = the id comment page and e = the error

## Corpus structure

The identifier of movie is his id on allocine's website ( for exemple The movie The end of Evangelion have id 147423 because url to acceed of the movie is 
www.allocine.fr/film/fichefilm_gen_cfilm=147423.html ).

The id_page is the identifer of the page who are the comments ( www.allocine.fr/film/fichefilm-6429/critiques/spectateurs/?page=2 is the second page of akira's comments so the id is 2 )

The corpus is written progressively in Corpus file with this format.
```
**Corpus**
 |__11478.json
 |__221620.json
 |__ ......

```

The structure of a file is :
```
{
    data : [
        {
            #First comment
            id_movie : 147423
            id_page : 2
            comments : the best movie
            stareval_note : 5.0
        },
        {
            #Second comment
            id_movie : 147423
            id_page : 2
            comments : very good movie
            stareval_note : 4.5
        },.....     
    ]
}
```

Here the comment is 'the best movie' with a 5 out of 5 star rating on the movie The end of Evangelion and you can find this comment on the second comments page

With the corpus you can fit your model to predict the positivity of a text for example

### Update comming soon

The number of movie will be increase ( the first crawl got only the 135 first movie )

### Get the corpus 

Go to <https://github.com/toDo-cpu/Movie-comments-rate-Corpus/tree/master
