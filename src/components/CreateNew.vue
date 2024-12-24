<script setup lang="ts">

  const props = defineProps({
    show: Boolean, // Prop für die Sichtbarkeit
  });

  const emit = defineEmits(['close']); // Event, um den Dialog zu schließen

</script>

<template>
 <div v-if="show">
   <div class="frost"></div>
   <div class="paper popup">
     <h1 class="shadow">"neuerName"@</h1>
     <ul>
       <li class="select">unschuld.org</li>
       <li class="select">lisawichmann.de</li>
       <li class="select">norddeutsch.org</li>
     </ul>
     <div class="row">
       <div class="paper-frame">
         <button class="back" @click="$emit('close')">zurück</button>
       </div>
       <div class="paper-frame">
         <button class="ok">ok</button>
       </div>
     </div>
   </div>
 </div>
</template>

<style scoped>

.row {
  margin-bottom: 2vh;
  width: 70vw;
  justify-content: space-between;
}

h1 {
  margin: 2vh;
  width: 70vw;
}

ul {
  margin: 4vh 0 4vh 0;
  width: 70vw;
}

</style>/