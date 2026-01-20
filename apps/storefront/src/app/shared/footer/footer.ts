import {Component, computed, inject, resource} from "@angular/core";
import {CategoryService} from "../../data-source/category.service";
import {CollectionService} from "../../data-source/collection.service";
import {NavLink} from "../../app-nav-link";

@Component({
  selector: 'app-footer',
  imports: [NavLink],
  providers: [CategoryService, CollectionService],
  template: `
    <footer class="border-t border-border w-full">
      <div class="container-wrapper flex flex-col w-full">
        <div class="flex flex-col gap-y-6 sm:flex-row items-start justify-between py-20 md:py-40 px-6">

          <!-- Logo Section -->
          <div>
            <a appNavLink="/" class="text-xl font-bold uppercase hover:text-primary transition-colors">
              OpenBuild Store
            </a>
          </div>

          <!-- Links Grid -->
          <div class="text-sm gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">

            <!-- Categories -->
            @if (categoryResource.value(); as cats) {
              <div class="flex flex-col gap-y-2">
                <span class="font-semibold text-foreground">Categories</span>
                <ul class="grid grid-cols-1 gap-2">
                  @for (c of cats; track c.id) {
                    <li class="flex flex-col gap-2 text-muted-foreground">
                      <a [appNavLink]="['/categories', c.handle]"
                         class="hover:text-foreground transition-colors"
                         [class.font-medium]="c.category_children?.length">
                        {{ c.name }}
                      </a>
                      @if (c.category_children?.length) {
                        <ul class="grid grid-cols-1 ml-3 gap-2 border-l pl-3">
                          @for (child of c.category_children; track child.id) {
                            <li>
                              <a [appNavLink]="['/categories', child.handle]" class="hover:text-foreground">
                                {{ child.name }}
                              </a>
                            </li>
                          }
                        </ul>
                      }
                    </li>
                  }
                </ul>
              </div>
            }

            @if (collectionsResource.value(); as colls) {
              <div class="flex flex-col gap-y-2">
                <span class="font-semibold text-foreground">Collections</span>
                <ul>
                  @for (c of colls; track c.id) {
                    <li>
                      <a [appNavLink]="['/collections', c.handle]" class="hover:text-foreground">
                        {{ c.title }}
                      </a>
                    </li>
                  }
                </ul>
              </div>
            }

            <div class="flex flex-col gap-y-2">
              <span class="font-semibold text-foreground">OpenBuild</span>
              <ul class="grid grid-cols-1 gap-y-2 text-muted-foreground">
                <li><a href="https://github.com/medusajs" target="_blank" class="hover:text-foreground">GitHub</a></li>
                <li><a href="https://docs.medusajs.com" target="_blank" class="hover:text-foreground">Documentation</a></li>
                <li><a href="#" target="_blank" class="hover:text-foreground">Source code</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div class="flex w-full mb-16 justify-between items-center px-6 text-muted-foreground text-sm">
          <p>© {{ currentYear() }} OpenBuild. All rights reserved.</p>
          <div class="flex items-center gap-2">
             <span class="text-xs italic">Built with Spartan & Medusa</span>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class Footer {
  private categoryService = inject(CategoryService);
  private collectionService = inject(CollectionService);
  collectionsResource = resource({
    loader: () => this.collectionService.collectionList({
      fields: '*category_children',
    }),
  });

  categoryResource = resource({
    loader: () => this.categoryService.categoryList({ limit: 10 }),
  });
  protected currentYear = computed(() => new Date().getFullYear());
}
