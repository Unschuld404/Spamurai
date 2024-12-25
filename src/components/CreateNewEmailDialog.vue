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
     <h1>beispiel@</h1>
     <ul>
       <li>
         <div class="paper-frame fwd">
           <button class="forward">unschuld.org</button>
         </div>
       </li>
       <li>
         <div class="paper-frame fwd">
           <button class="forward">lisawichmann.de</button>
         </div>
       </li>
       <li>
         <div class="paper-frame fwd">
           <button class="forward">norddeutsch.org</button>
         </div>
       </li>
     </ul>
     <div class="row">
       <div class="paper-frame">
         <button class="back" @click="$emit('close')">zurück</button>
       </div>
     </div>
   </div>
 </div>
</template>

<style scoped>

.row {
  justify-content: space-between;
  gap: 5dvw;
}

ul {
  margin: 4dvh 0 4dvh 0;
  width: 95%;
}

button {
  width: 100%;
  height: 100%;
}

</style>/