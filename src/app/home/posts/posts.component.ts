import { Component, OnInit } from '@angular/core';
import { FacebookService } from '../../shared/facebook.service';

@Component({
  selector: 'app-home-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts = [];
  title = {
    mar: '<span class="primary-color">सामाजिक</span> उपक्रम',
    eng: '<span class="primary-color">Social</span> Initiatives'
  };
  lang = 'mar';
  readMore = {
        mar: 'पुढे वाचा',
        eng: 'Read More'
    };

  constructor(private fb: FacebookService) { }

  ngOnInit() {
          this.lang = window.localStorage.getItem('lang') || 'mar';
          this.getProjects();
          this.initSlider();
  }

  getProjects() {
        this.fb.getPostsWithLimit(20).subscribe(
            projects => { this.posts = projects.data},
            null,
            () => this.processProjects()
        );
    }

  processProjects() {
        var proj = [];
        console.log(this.posts);

        for (let p of this.posts) {
            if (p['attachments'] && p['message']) {
                let src = p['attachments']['data'][0]['subattachments']['data'][0]['media']['image']['src'];
                for (var i of p['attachments']['data'][0]['subattachments']['data']) {
                    if (i['media']['image']['height'] < i['media']['image']['width']) {
                        src = i['media']['image']['src'];
                        break;
                    }
                }
                p['attachments'] = null
                p['src'] = src;
                proj.push(p);
                if(proj.length==6)
                  break;
            }
        }
        this.posts = proj;
        this.initSlider();
        console.log(this.posts);        
  }

  private initSlider(){
    // Instantiate the Bootstrap carousel
    let newProj = [], l=this.posts.length;
    for(let i=0; i<l; i++){
        let j = []
        j.push(this.posts[i])
        j.push(this.posts[(i+1)%l])
        j.push(this.posts[(i+2)%l])
        newProj.push(j)
    }
    this.posts = newProj

    $('.multi-item-carousel').carousel({
        interval: 3000
    });

  }

}
