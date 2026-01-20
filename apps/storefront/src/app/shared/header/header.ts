import {Component, computed} from '@angular/core';
import {NgIcon, provideIcons} from '@ng-icons/core';
import {lucideGithub, lucideTwitter} from '@ng-icons/lucide';
import {HeaderMobileNav} from "./header-mobile-nav";
import {RouterLink} from "@angular/router";
import {HlmButton} from "@spartan-ng/helm/button";
import {HlmIcon} from "@spartan-ng/helm/icon";
import {HlmSeparatorImports} from "@spartan-ng/helm/separator";
import {httpResource} from "@angular/common/http";
import {AppLogo} from "../app-logo";
import {NavLink} from "../../app-nav-link";

@Component({
  selector: 'app-header',
  imports: [
    HlmButton,
    RouterLink,
    HlmIcon,
    HeaderMobileNav,
    HeaderMobileNav,
    HlmSeparatorImports,
    AppLogo,
    NavLink,
    NgIcon,
  ],
  providers: [provideIcons({lucideTwitter, lucideGithub})],
  host: {
    class: 'backdrop-blur-sm sticky top-0 z-50 w-full',
  },
  template: `
    <div class="container-wrapper 3xl:fixed:px-0 px-6">
      <div class="3xl:fixed:container flex h-14 items-center gap-2 **:data-[slot=separator]:!h-4">
      <a hlmBtn variant="ghost" class="hidden p-1.5 lg:flex" routerLink="/">
          <app-logo class="w-14"/>
          <span class="sr-only">spartan</span>
        </a>

        <app-mobile-nav class="lg:hidden"/>

        <div class="hidden sm:space-x-2 lg:flex">
          <a appNavLink="/documentation">Docs</a>
          <a appNavLink="/components">Components</a>
          <a appNavLink="/blocks">Blocks</a>
          <a appNavLink="/colors">Colors</a>
          <a appNavLink="/stack">Stack</a>
        </div>

        <div class="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
          <hlm-separator orientation="vertical" class="h-4!"/>
          <a href="https://github.com/spartan-ng/spartan" target="_blank" size="sm" variant="ghost" hlmBtn>
            <ng-icon hlm name="lucideGithub" size="sm"/>
            <span class="text-muted-foreground text-xs">{{ _stars() }}</span>
          </a>
          <hlm-separator orientation="vertical" class="h-4!"/>
        </div>
      </div>
    </div>
  `,
})
export class Header {
  private readonly _githubInfo = httpResource<{ stars: number }>(() => '/api/github-info');

  protected readonly _stars = computed(() => {
    const count = this._githubInfo.value()?.stars ?? 0;
    if (count < 1000) return count.toString();
    const rounded = Math.floor((count / 1000) * 10) / 10;
    return `${rounded}k`;
  });
}
