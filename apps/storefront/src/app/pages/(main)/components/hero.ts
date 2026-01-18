import {Component, input} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage],
  template: `
    <div class="h-[75vh] w-full border-b border-gray-200 relative bg-neutral-100">
      <img
        [ngSrc]="backgroundImage()"
        alt="Hero background"
        fill
        priority
        class="object-cover z-0"
      />

      <div class="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-6 sm:px-32 gap-6">
        <span class="flex flex-col items-center">
          <p class="text-neutral-600 text-[10px] sm:text-xs uppercase tracking-widest animate-fade-in">
            {{ topLabel() }}
          </p>

          <h1 class="text-4xl sm:text-6xl leading-tight text-gray-900 font-normal mt-10 mb-5">
            {{ title() }}
          </h1>

          <p class="leading-relaxed text-gray-500 font-normal text-base sm:text-lg">
            {{ subtitle() }}
          </p>
        </span>

        <a
          [href]="githubUrl()"
          target="_blank"
          class="no-underline group"
        >
          <button class="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-300 text-gray-800 text-sm font-medium rounded-2xl hover:bg-gray-50 transition-all shadow-sm active:scale-95 group-hover:border-gray-400">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="transition-transform group-hover:rotate-12"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            Github Repository
          </button>
        </a>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class HeroComponent {
  topLabel = input<string>('Be light on your feet');
  title = input<string>('Portable Bestsellers');
  subtitle = input<string>('See our widest selection of electronics');
  backgroundImage = input<string>('assets/hero-image.jpg');
  githubUrl = input<string>('https://github.com/medusajs/b2b-starter-medusa');
}
