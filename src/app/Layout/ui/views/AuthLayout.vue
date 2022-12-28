<script lang="ts" setup>
import { onMounted } from "vue";
onMounted(() => {
  document.body.classList.add("app-blank", "bgi-size-cover", "bgi-position-center", "bgi-no-repeat");
  document.body.style.backgroundImage = "url('src/assets/img/auth/bg1.jpg')";
});
</script>

<template>
  <div
    class="d-flex flex-column flex-root"
    id="kt_app_root"
  >
    <div class="d-flex flex-column flex-column-fluid flex-lg-row">
      <div class="d-flex flex-center w-lg-50 pt-15 pt-lg-0 px-10">
        <div class="d-flex flex-center flex-lg-start flex-column"></div>
      </div>
      <div class="d-flex flex-center w-lg-50 p-10">
        <div class="card rounded-3 w-md-500px">
          <div class="card-body p-10 p-lg-20">
            <RouterView v-slot="{ Component, route }">
              <Transition
                enter-active-class="animate__animated animate__fadeIn animate__faster"
                leave-active-class="animate__animated animate__fadeOut animate__faster"
                mode="out-in"
              >
                <div :key="route.path">
                  <component :is="Component"></component>
                </div>
              </Transition>
            </RouterView>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
