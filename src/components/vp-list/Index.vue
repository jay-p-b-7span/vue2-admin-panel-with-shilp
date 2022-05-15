<template>
  <VList
    :per-page="perPage"
    :attrs="attrs"
    :endpoint="endpoint"
    :filters="localFilters"
    :params="params"
    ref="list"
    @selection="onSelectionChange(arguments)"
    @res="$emit('res', $event)"
  >
    <!-- TOP -->
    <template
      v-if="header"
      #header="{ response, loading, loadingPage, instance }"
    >
      <!-- HEADER -->
      <div class="sticky top-0 bg-white z-10 border-b">
        <LineLoader
          v-if="loadingPage"
          class="absolute bottom-0 left-0 right-0 z-20"
        />
        <HeaderShimmer v-if="loading" />

        <!--  -->
        <div v-else class="flex flex--stretch flex--nowrap flex--fit h-12">
          <!-- TITLE -->
          <div class="pl-4 pr-6 flex items-center justify-center h-12">
            <p class="font-bold leading-none">{{ title }}</p>
            <p class="leading-none text-grey ml-1">
              ({{ response && response.count }})
            </p>
          </div>

          <!-- BULK ACTIONS -->
          <HeaderButton
            v-if="selections.length > 0"
            class="border-l"
            icon="IconMdiBuffer"
            :label="`${selections.length} Selected`"
            @click.native="$slideover.open('list-bulk-actions')"
            ping
          />

          <!-- Search -->
          <VListSearch
            v-if="search"
            class="border-l border-r flex-grow relative"
            :class="!search ? 'hidden' : ''"
            v-slot="{ value, set }"
          >
            <input
              class="w-full h-12 px-4 outline-none focus:ring-2 focus:ring-inset focus:ring-grey-lighter"
              placeholder="Search"
              type="text"
              :value="value"
              @input="set($event.target.value)"
            />
            <s-icon
              class="w-6 h-6 absolute right-4 top-0 bottom-0 my-auto text-grey-light"
              name="IconMdiMagnify"
            />
          </VListSearch>

          <!-- Action Buttons -->
          <div class="divide-x flex" :class="!search ? 'border-l ml-auto' : ''">
            <HeaderButton icon="IconMdiRefresh" @click.native="refresh()" />
            <HeaderButton
              v-if="filters"
              icon="IconMdiFilterOutline"
              :ping="isFilterApplied"
              @click.native="$slideover.open('list-filters')"
            />
            <HeaderButton
              icon="IconMdiCogOutline"
              v-if="settings"
              @click.native="$slideover.open('list-settings')"
            />
          </div>
        </div>
      </div>

      <!-- SETTINGS -->
      <Settings :instance="instance" />

      <!-- BULK ACTIONS -->
      <Bulk>
        <slot
          name="_bulk"
          :selections="selections"
          :count="selections.length"
          :ids="selections.map((row) => parseInt(row.id))"
        />
      </Bulk>

      <!-- FILTERS -->
      <!-- <Slideover id="list-filters" title="Filters" :size="300">
        <div class="p-4 my-4">
          <slot name="filters" />
          <s-button
            class="mt-4"
            theme="muted"
            color="danger"
            label="Reset"
            icon="IconMdiFilterRemoveOutline"
            @click.native="resetFilters()"
          />
        </div>
      </Slideover> -->
    </template>

    <!-- LOADING PAGE -->
    <template #loading-page><span class="absolute"></span></template>

    <!-- EMPTY -->
    <template #empty>
      <TableEmpty
        class="flex flex--col flex--center flex--middle flex--fit pt-28"
      />
    </template>

    <!-- LOADING -->
    <template #loading>
      <Shimmer />
    </template>

    <!-- DEFAULT -->
    <template #default="{ response }">
      <slot :response="response">
        <!-- TABLE -->
        <div class="p-4">
          <!-- TODO : To understand below rowClass usage It was causing error in rendering table which took me almost 3 hours to find out the root cause of the problem -->
          <VListTable
            :rowClass="
              () => {
                return '';
              }
            "
            class="vpr-table"
            :class="{ 'vpr-table--row-click': rowClick }"
            :reorder="reorder"
            @rowClick="$emit('rowClick', $event)"
            @reorder="$emit('reorder', $event)"
          >
            <!-- Header -->
            <template #th_select="{ toggleSelectAll, selectionState }">
              <SelectRow
                :state="selectionState"
                index="#"
                @change="toggleSelectAll()"
              />
            </template>

            <!-- Select -->
            <template #select="{ toggleSelect, isSelected, rowIndex }">
              <SelectRow
                :state="isSelected ? 'all' : 'none'"
                :index="rowIndex"
                @change="toggleSelect()"
              />
            </template>

            <!-- Drag -->
            <template #_drag>
              <s-icon
                name="IconMdiDrag"
                title="Drag to Sort"
                class="v-list-table__drag w-8 h-8"
                color="grey"
              />
            </template>

            <!-- Rows After -->
            <template #body-end>
              <slot name="rows-after" :response="response" />
            </template>

            <!-- Inherit Slots -->

            <!--  Below $scopedSlots is an object which contains slot name keys , but directly unable to use with these object -->
            <!-- Therefore using Object.keys method to extract keys from object -->
            <template
              v-for="name in Object.keys($scopedSlots)"
              :slot="name"
              slot-scope="slotData"
            >
              <slot :name="name" v-bind="slotData" :response="response"> </slot>
            </template>
          </VListTable>
        </div>
      </slot>

      <!-- FOOTER -->
      <div v-if="paginationVisibility(response)" class="border-t border-b">
        <!-- PAGINATION -->
        <VListLoadMore v-if="infinite">
          <template #default="{ loadMore }">
            <s-button
              class="flex justify-center align-middle"
              color="primary"
              label="Load More"
              @click.native="loadMore"
            />
          </template>
        </VListLoadMore>
        <VListPagination
          v-else
          class="vp-list-paging flex flex--fit flex--nowrap flex--center divide-x"
        >
          <template #prev="{ prev, hasPrev }">
            <button :disabled="!hasPrev" @click="prev()">
              <s-icon name="IconMdiArrowLeft" />
            </button>
          </template>

          <template #page="{ change, value, isActive }">
            <button class="vp-bg-gray-100" v-if="isActive">
              {{ value }}
            </button>
            <button v-else @click="change(value)">
              {{ value }}
            </button>
          </template>

          <template #next="{ next, hasNext }">
            <button :disabled="!hasNext" @click="next()">
              <s-icon name="IconMdiArrowRight" />
            </button>
          </template>
        </VListPagination>
      </div>
    </template>
  </VList>
</template>

<script>
import { debounce, isEqual } from "lodash-es";

export default {
  props: {
    perPage: {
      type: Number,
      default: 25,
    },
    columns: Array,
    endpoint: String,
    filters: Object,
    params: Object,
    title: String,
    bulk: Boolean,
    reorder: {
      type: Boolean,
      default: false,
    },
    infinite: {
      type: Boolean,
      default: false,
    },
    search: {
      type: Boolean,
      default: true,
    },
    header: {
      type: Boolean,
      default: true,
    },
    settings: {
      type: Boolean,
      default: true,
    },
    /**
     * cache is used for defining apollo cache fieldName that we need to clear from cache.
     * This will be used for cache fieldName first if value given as prop.
     * If value is not given then by default, it will take endpoint value.
     */
    cache: String,
    rowClick: {
      type: Boolean,
      default: true,
    },
  },

  components: {
    LineLoader: require("@/components/LineLoader").default,
    HeaderButton: require("./HeaderButton").default,
    HeaderShimmer: require("./HeaderShimmer").default,
    Shimmer: require("./Shimmer").default,
    Settings: require("./Settings").default,
    SelectRow: require("./SelectRow").default,
    Bulk: require("./Bulk").default,
    TableEmpty: require("./TableEmpty").default,
  },

  data() {
    return {
      localFilters: { ...this.filters },
      defaultFilters: { ...this.filters },
      selections: [],
    };
  },

  computed: {
    isFilterApplied() {
      return !isEqual(this.localFilters, this.defaultFilters);
    },

    attrs() {
      const attrs = [];

      if (this.bulk) {
        attrs.push({
          name: "select",
          label: "#",
          fix: true,
          rowClick: false,
          type: "string",
        });
      }

      attrs.push(...this.columns);
      return attrs;
    },
  },

  watch: {
    filters: {
      deep: true,
      handler: debounce(function (newValue) {
        this.localFilters = { ...newValue };
      }, 1000),
    },
  },

  methods: {
    paginationVisibility(response) {
      if (this.perPage === -1) {
        return false;
      } else if (response?.count >= this.perPage) {
        return true;
      } else {
        return false;
      }
    },
    onSelectionChange(data) {
      this.selections = data[0];
    },
    resetFilters() {
      this.localFilters = {
        ...this.defaultFilters,
      };
      this.$emit("update:filters", this.localFilters);
    },

    refresh() {
      this.$slideover.close();
      this.$nextTick(() => {
        this.$refs.list.refresh();
      });
    },
  },
};
</script>

<style lang="scss">
.vp-list-paging {
  button {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-weight: 700;
    color: var(--color--grey);
  }

  button {
    outline: none !important;
    &:hover {
      background: var(--color--grey--lightest);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
}

.vpr-table {
  width: 100%;

  th,
  td {
    padding: 4px;
  }

  th {
    font-size: var(--text--sm);
    border-bottom: 1px;
    padding-bottom: 4px;
    color: var(--color--grey) !important;
  }

  tr {
    + tr {
      td {
        border-top-width: 1px;
      }
    }
  }

  &--row-click {
    tr {
      &:hover {
        background: var(--color--grey--lightest);
        .vpr-table-select__check {
          display: block;
        }
        .vpr-table-select__index {
          display: none;
        }
      }
    }

    .v-list-table {
      &__click {
        cursor: pointer;
      }
    }
  }
}

.vpr-table {
  .v-list-table {
    //Td Type
    &__fix {
      width: 0px;
    }
    &__number {
      text-align: right;
    }
    &__string {
      text-align: left;
    }
    &__date {
      text-align: left;
      white-space: nowrap;
      color: var(--color--grey);
      font-size: var(--text--sm);
    }
    &__selected {
      background-color: var(--color--warning--lightest) !important;
    }
  }
}

.vpr-table-select {
  min-width: 20px;
  min-height: 20px;
  &__check {
    display: none;
    color: var(--color--grey);
    width: 20px;
    height: 20px;
    cursor: pointer;
    svg {
      width: 100%;
      height: 100%;
    }
  }
  &--selected {
    .vpr-table-select__check {
      display: block;
      color: var(--color--warning);
    }
    .vpr-table-select__index {
      display: none;
    }
  }
}
.sortable-ghost {
  background-color: #fff8e1;
}
</style>
