import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {PageComponent} from './page.component';

@NgModule({
  imports: [
    RouterModule.forChild([
        {path: 'home', component: PageComponent},
        {path: 'about', component: PageComponent},

        // about children -- need refactoring here
        {path: 'mission-statement', component: PageComponent},
        {path: 'affiliations', component: PageComponent},
        {path: 'success-stories', component: PageComponent},
        {path: 'newsletter', component: PageComponent},
        {path: 'arrowhead-2020', component: PageComponent},

        // success-stories children
        {path: 'in-their-own-words', component: PageComponent},

        {path: 'staff', component: PageComponent},
        {path: 'our-board-of-directors', component: PageComponent},
        {path: 'strategic-plan', component: PageComponent},
        {path: 'executive-summary', component: PageComponent},

        {path: 'our-program', component: PageComponent},

        // our-program children
        {path: 'residential-programs', component: PageComponent},
        {path: 'programs-for-girls', component: PageComponent},
        {path: 'alternative-to-detention', component: PageComponent},
        {path: 'strategies-to-succeed', component: PageComponent},
        {path: 'education-programs', component: PageComponent},
        {path: 'admissions', component: PageComponent},
        {path: 'family-involvement', component: PageComponent},
        {path: 'religion', component: PageComponent},
        {path: 'independent-living-skills', component: PageComponent},
        {path: 'aftercare', component: PageComponent},
        {path: 'additional-service', component: PageComponent},
        {path: 'conducting-accordingly', component: PageComponent},
        {path: 'education', component: PageComponent},

        {path: 'placement', component: PageComponent},

        {path: 'events', component: PageComponent},

        // events children
        {path: 'upcoming-events', component: PageComponent},

        // upcoming-events children
        {path: 'annual-golf-outing-2017', component: PageComponent},
        {path: 'roundup', component: PageComponent},
        {path: 'trivia-night-2018', component: PageComponent},

        {path: 'annual-events', component: PageComponent},
        {path: 'fundraisers', component: PageComponent},


        {path: 'arrowhead-in-action', component: PageComponent},
        {path: 'giving', component: PageComponent}
    ])
  ],
  exports: [RouterModule]
})
export class PageRoutingModule {}
