<template>
  <div class="item-form" :style="{ width: width }">
    <!-- GETTING -->
    <form-shimmer :class="shimmerClasses" v-if="getting && !custom" />

    <!-- GET ERROR -->
    <error v-else-if="id && getItemFaild" :data="errors" />

    <!-- RENDER YOUR THING -->
    <slot v-else-if="custom" :data="data" :getting="getting"></slot>

    <!-- RENDER FORM -->
    <s-form-validate v-else ref="form" @submit="saveItem()" #default="scope">
      <header class="item-form__header">
        <slot name="header">
          <page-header v-if="title" class="mb-4" :title="title">
            <p>{{ desc }}</p>
          </page-header>
        </slot>
        <error v-if="errors" :data="errors" />
      </header>
      <div class="field-group" :class="`g-${gap}`">
        <slot
          v-if="form"
          :data="data"
          :form="form"
          :saveItem="saveItem"
          :setField="setField"
          :saving="saving"
          :getting="getting"
          :creating="id ? false : true"
          :validate="scope"
        />
      </div>

      <footer v-if="footer" class="flex flex--nowrap" :class="footerClassList">
        <slot name="footer-start-start"></slot>
        <slot
          name="footer"
          :data="data"
          :form="form"
          :saveItem="saveItem"
          :saving="saving"
          :getting="getting"
          :creating="id ? false : true"
        >
          <s-button
            v-if="save"
            class="flex__fit"
            color="primary"
            :label="id ? saveLabel : createLabel"
            @click.native="saveItem"
            :loader="saving"
          />
          <s-button
            v-if="!id"
            class="flex__fit ml-2"
            color="grey"
            theme="muted"
            @click.native="reset"
            label="Reset"
          />
          <template v-else>
            <s-button
              v-if="data && archive"
              class="flex__fit ml-auto"
              color="warning"
              theme="muted"
              :icon="data.archivedAt ? 'ArchiveArrowUp' : 'ArchiveArrowDown'"
              v-tooltip="data.archivedAt ? 'Unarchive Item' : 'Archive Item'"
              shape="square"
              @click.native="archiveItem"
              :loader="archiving"
            />
            <s-button
              v-if="del"
              class="flex__fit"
              :class="archive ? 'ml-2' : 'ml-auto'"
              color="danger"
              theme="muted"
              icon="IconIcRoundDeleteForever"
              shape="square"
              @click.native="deleteItem"
              :loader="deleting"
              v-tooltip="'Delete'"
            />
          </template>
        </slot>
        <slot name="footer-start-end"></slot>
      </footer>
    </s-form-validate>
  </div>
</template>

<script>
import { cloneDeep } from "lodash-es";
// import { mapActions } from "vuex";
// import request from "@/utils/request";

export default {
  props: {
    title: String,
    desc: String,
    custom: {
      type: Boolean,
      default: false,
    },
    gap: {
      type: Number,
      default: 4,
    },
    item: [Number, String, Boolean],
    fields: {
      type: Array,
      default: () => [],
    },
    formState: null,
    width: String,
    breadcrumb: [Boolean, String],
    breadcrumbRoute: String,
    get: Function,
    save: Function,
    del: Function,
    archive: Function,
    redirect: {
      type: Boolean,
      default: true,
    },
    redirectTo: {
      type: String,
    },
    footer: {
      type: Boolean,
      default: true,
    },
    footerClassList: {
      type: Array,
      default: () => ["mt-4"],
    },
    defaultData: Object,
    saveLabel: {
      type: String,
      default: "Save",
    },
    createLabel: {
      type: String,
      default: "Create",
    },
    shimmerClasses: [String, Array, Object],
    notify: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      getting: false,
      saving: false,
      deleting: false,
      archiving: false,
      form: null,
      data: null,
      getItemFaild: false,
      saveItemFaild: false,
      errors: null,
      needUpgrade: false,
      usage: null,
      // formState: null
    };
  },
  watch: {
    form: {
      deep: true,
      handler(newValue) {
        this.$emit("update:formState", newValue);
      },
    },
  },
  components: {
    FormShimmer: require("./FormShimmer").default,
    PageHeader: require("./PageHeader").default,
    Error: require("./Error").default,
  },
  computed: {
    fieldsSet() {
      return this.fields.map((field) => {
        if (typeof field !== "object") {
          return {
            name: field,
            value: null,
          };
        }
        return field;
      });
    },
    id() {
      if (this.item && this.item == "+") return null;
      return this.item;
    },
  },

  mounted() {
    this.start();
  },
  // watch: {
  //   form: {
  //     deep: true,
  //     handler(newValue) {
  //       this.$emit("update:formState", newValue);
  //     }
  //   },
  //   id() {
  //     this.getItem();
  //   }
  // },

  methods: {
    refresh() {
      this.start();
    },

    start() {
      if (this.defaultData) {
        this.setForm(cloneDeep(this.defaultData));
      } else if (this.id) {
        this.getItem();
      } else {
        this.setForm();
        this.updateBreadcrumb("Add New");
      }
      //Reset if any old validation errors were present
      //This is helpful when item is being added
      this.$refs.form?.$refs.formObserver.reset();
    },

    reset() {
      this.errors = null;
      this.setForm();
      this.$refs.form.$refs.formObserver.reset();
    },

    setField(key, value) {
      this.$set(this.form, key, value);
      if (this.data) {
        this.$set(this.data, key, value);
      }
    },

    setForm(res) {
      this.data = res;
      if (!this.form) this.$set(this, "form", {});
      this.fieldsSet.forEach((field) => {
        // if (res && res.hasOwnProperty(field.name)) {
        if (res && Object.prototype.hasOwnProperty.call(res, field.name)) {
          this.$set(this.form, field.name, res[field.name]);
        } else {
          this.$set(this.form, field.name, field.value);
        }
      });
    },

    doRedirect() {
      if (this.redirect) {
        if (this.redirectTo) {
          this.$router.push({ name: this.redirectTo });
        } else {
          const breadcrumbs = this.$route.meta?.breadcrumbs;
          if (breadcrumbs) {
            const toRedirect = breadcrumbs[breadcrumbs.length - 2];
            if (toRedirect) this.$router.push({ name: toRedirect });
          }
        }
      } else {
        this.refresh();
      }
    },

    async getItem() {
      this.getItemFaild = false;
      this.getting = true;
      this.errors = null;
      try {
        const res = await this.get(this.id);
        this.setForm(res);
        this.$emit("get", res);
        this.updateBreadcrumb();
      } catch (err) {
        this.errors = err;
        this.getItemFaild = true;
      }
      this.getting = false;
    },

    updateBreadcrumb(label) {
      if (!this.breadcrumb) return;
      this.$root.$emit(
        "shilp-breadcrumbs-label",
        this.breadcrumbRoute || this.$route.name,
        label || this.data?.[this.breadcrumb]
      );
    },

    async saveItem() {
      const isValid = await this.$refs.form.validate();
      if (!isValid) {
        if (this.notify) {
          this.$shilp.notify({
            title: "Invalid Data!",
            message:
              "You've provided invalid data in the form. Please verify & try again.",
            type: "danger",
          });
        }
        return;
      }
      this.errors = null;
      this.saving = true;
      this.saveItemFaild = false;

      let res;
      try {
        res = await this.save(this.id, this.form);
        this.success();
        if (!this.id) this.setForm();
        this.doRedirect();
      } catch (err) {
        this.saveItemFaild = true;
        this.error(err);
      }
      this.saving = false;
      return res;
    },

    async archiveItem() {
      const isArchived = this.data.archivedAt;
      let msg;
      if (isArchived) {
        msg = "Are you sure you want to unarchive item?";
      } else {
        msg = "Are you sure you want to archive?";
      }
      const isConfirm = confirm(msg);

      if (!isConfirm) return;
      this.archiving = true;
      try {
        // const action = isArchived ? "unarchive" : "archive";
        // const res = await this.archive(this.id, action);
        this.success();
        this.doRedirect();
      } catch (err) {
        this.error(err);
      }
      this.archiving = false;
    },

    async deleteItem() {
      const isConfirm = confirm("Are you sure you want to delete?");
      if (!isConfirm) return;

      this.deleting = true;
      try {
        // const res = await this.del(this.id, "delete");
        this.success(true);
        this.doRedirect();
      } catch (err) {
        this.error(err);
      }
      this.deleting = false;
    },

    success() {
      if (this.notify) {
        this.$shilp.notify({
          title: "Success",
          type: "success",
          duration: 1000,
        });
      }
    },

    error(data) {
      //TODO: This is ugly fix
      this.errors = data.response ? data.response.data : data.data;

      if (this.notify) {
        this.$shilp.notify({
          title: "An error occured.",
          type: "danger",
        });
      }
    },
  },
};
</script>

<style lang="scss">
// .item-form__header {
//   position: sticky;
//   top: --space(2);
//   z-index: 9;
// }
</style>
