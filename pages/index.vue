<template>
  <div class="container">
    <!-- Left Sidebar Navigation -->
    <aside class="side-nav">
      <button
        v-for="(component, index) in components"
        :key="index"
        @click="showSingleComponent(component.name)"
      >
        {{ component.label }}
      </button>
      <!-- Add the "ALL" button -->
      <button @click="showAllComponents">ALL</button>
    </aside>

    <!-- Main Content -->
    <main class="content">
      <!-- Display the selected component -->
      <component v-if="!showAll" :is="currentComponent" />

      <!-- Display components in a specific order when "ALL" is clicked -->
      <div v-if="showAll">
        <Component1 @update-middle-component="updateMiddleComponent" />
        <component :is="middleComponent" @update-middle-component="updateMiddleComponent" />
        <Component2 @update-middle-component="updateMiddleComponent" />
      </div>
    </main>
  </div>
</template>

<script>
import Component1 from "~/components/Component1.vue";
import Component2 from "~/components/Component2.vue";
import Component3 from "~/components/Component3.vue";
import Component4 from "~/components/Component4.vue";
import Component5 from "~/components/Component5.vue";
import Component6 from "~/components/Component6.vue";
import Component7 from "~/components/Component7.vue";
import Component8 from "~/components/Component8.vue";
import Component9 from "~/components/Component9.vue";
import Component10 from "~/components/Component10.vue";
import Component11 from "~/components/Component11.vue";

export default {
  data() {
    return {
      components: [
        { name: "Component1", label: "Component 1" },
        { name: "Component2", label: "Component 2" },
        { name: "Component3", label: "Component 3" },
        { name: "Component4", label: "Component 4" },
        { name: "Component5", label: "Component 5" },
        { name: "Component6", label: "Component 6" },
        { name: "Component7", label: "Component 7" },
        { name: "Component8", label: "Component 8" },
        { name: "Component9", label: "Component 9" },
        { name: "Component10", label: "Component 10" },
        { name: "Component11", label: "Component 11" },
      ],
      currentComponent: "Component1", // Default to the first component
      showAll: false, // Flag to control whether to show all components
      middleComponent: "Component3", // Default middle component
    };
  },
  components: {
    Component1,
    Component2,
    Component3,
    Component4,
    Component5,
    Component6,
    Component7,
    Component8,
    Component9,
    Component10,
    Component11,
  },
  methods: {
    // Method to show all components
    showAllComponents() {
      this.showAll = true;
    },
    // Method to show a single component
    showSingleComponent(componentName) {
      this.showAll = false; // Reset the "showAll" flag
      this.currentComponent = componentName; // Set the current component
    },
    // Method to update the middle component
    updateMiddleComponent(componentName) {
      this.middleComponent = componentName;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
}

.side-nav {
  width: 200px;
  background: #f5f5f5;
  padding: 10px;
  height: 100vh;
}

.side-nav button {
  display: block;
  width: 100%;
  margin: 5px 0;
  padding: 10px;
  border: none;
  background: #ddd;
  cursor: pointer;
}

.side-nav button:hover {
  background: #bbb;
}

.content {
  flex: 1;
  padding: 20px;
  background: #fff;
  border-left: 2px solid #ddd;
}
</style>