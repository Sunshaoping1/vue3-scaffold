<template>
  <!-- 路由的动态菜单 -->

  <div class="admin_home" :class="{ close: menuSable.close.value }">
    <div class="menu bg-gray-800">
      <div class="logo text-gray-300 flex pt-3 justify-center">
        <i
          class="fa-brands fa-angellist mr-1 cursor-poiooknter text-fuchsia-200 text-[20px]"
        ></i>
        <span class="text-md">创业板指</span>
      </div>
      <!-- 菜单 -->
      <div class="left-container">
        <!-- <dl>
          <dt
            @click="$router.push({ name: 'admin.home' })"
            :class="{ 'bg-violet-600  rounded-md p-1': $route.name == 'admin.home' }"
          >
            <section>
              <i class="fas fa-home text-xl"></i>
              <span>home</span>
            </section>
          </dt>
        </dl> -->
        <dl v-for="(menu, index) in menuSable.menus.value" :key="index">
          <dt @click="handle(menu)">
            <section>
              <i v-if="menu.icon" :class="[menu.icon, 'text-xl']"></i>
              <span>{{ menu.title }}</span>
            </section>
            <section>
              <i
                :class="{ 'rotate-180': menu.isActive }"
                class="fa-sharp fa-solid fa-angle-down duration-300 text-sm"
              ></i>
            </section>
          </dt>
          <dd v-show="menu.isActive && !menuSable.close.value">
            <div
              v-for="(cmenu, key) in menu.children"
              :key="key"
              :class="{ active: cmenu?.isActive }"
              @click="func(menu, cmenu)"
            >
              {{ cmenu?.title }}
            </div>
          </dd>
        </dl>
      </div>
    </div>
    <div class="bg block md:hidden" @click="menuSable.close.value = true"></div>
  </div>
</template>

<script setup lang="ts">
import { IMenu } from "#/menu";
import { useRoute, useRouter } from "vue-router";
// import { useMenuStore } from "@/store/menuStore";
import menuSable from "@/composables/menus";
import { throttle } from "@/utils";
import { watch } from "vue";

const router = useRouter();
const route = useRoute();

//加载菜单路由
await menuSable.initMenus();

//通过监听route来确保菜单唯一的选中效果，并确保历史导航的选中状态与菜单的同步
watch(route, () => menuSable.setCurrentMenu(route), { immediate: true });

//重置菜单路由的选中效果
const resetMenus = function (item: IMenu | undefined) {
  menuSable.menus.value?.forEach((pmenu) => {
    if (item) {
      pmenu.isActive = false;
      pmenu.children?.forEach((cmenu) => {
        // console.log(cmenu);
        if (cmenu?.hasOwnProperty("isActive")) delete cmenu.isActive;
      });
    }
  });
};

//点击后选中菜单，并跳转路由
const handle = (pmenu: IMenu, cmenu?: IMenu) => {
  resetMenus(cmenu);
  // console.log(menus.value);
  if (cmenu) {
    cmenu.isActive = true;
    pmenu.isActive = true;
    //尽量将不同业务的代码区分开，以便后期更好地维护
    // if (menuStore.historyMenus.every((item) => item.title !== cmenu.title))
    //   menuStore.historyMenus.push(cmenu);

    router.push({ name: cmenu.routeName ?? "admin.home" });
  } else {
    pmenu.isActive = !pmenu.isActive;
  }
};

//事件节流
const func = throttle(handle, 800);
</script>

<style lang="scss">
.admin_home {
  @apply h-screen;
  .menu {
    @apply h-full w-[200px];
    .left-container {
      dl {
        @apply text-sm text-gray-300;
        dt {
          @apply text-[16px] mt-6 flex justify-between items-center cursor-pointer mx-2;
          section {
            @apply flex items-center;
            i {
              @apply mr-2;
            }
          }
        }
        dd {
          div {
            @apply py-3 pl-4 my-2  text-white rounded-md cursor-pointer hover:bg-violet-300 duration-300;
            &.active {
              @apply bg-violet-600;
            }
          }
        }
      }
    }
  }
}
@media screen and (min-width: 768px) {
  .admin_home {
    //菜单收缩时要隐藏的样式
    &.close {
      .menu {
        i {
          margin-right: 0 !important;
          @apply px-2;
        }
        width: auto;
        .logo {
          span {
            @apply hidden;
          }
        }
        .left-container {
          dl {
            @apply relative;
            dt {
              section {
                span {
                  @apply hidden;
                }

                &:nth-of-type(2) {
                  @apply hidden;
                }
              }
            }
            &:hover {
              dd {
                // 鼠标悬停后显示
                display: block !important;
                @apply absolute z-50 left-full w-[180px] bg-slate-500 rounded-xl -translate-y-1/2;
                div {
                  @apply text-black w-auto;
                }
              }
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .admin_home {
    @apply h-screen  absolute left-0 top-0;
    .menu {
      @apply h-full w-[180px] absolute  z-50;
    }
    .bg {
      @apply h-screen w-screen bg-gray-700 opacity-70 absolute z-40;
    }
    &.close {
      @apply hidden;
    }
  }
}
</style>
