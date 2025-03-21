import { defineStore } from 'pinia'

interface FormData {
  [key: string]: any
}

export const useFormsStore = defineStore('forms', {
  state: () => ({
    formData: {} as { [key: string]: FormData },
    copies: 1,
    selectedForms: [] as string[]
  }),

  actions: {
    // 保存表单数据
    saveFormData(formPath: string, data: FormData) {
      this.formData[formPath] = data
    },

    // 获取表单数据
    getFormData(formPath: string): FormData {
      return this.formData[formPath] || {}
    },

    // 设置打印份数
    setCopies(copies: number) {
      this.copies = copies
    },

    // 设置选中的表单
    setSelectedForms(forms: string[]) {
      this.selectedForms = forms
    },

    // 清除所有数据
    clearAll() {
      this.formData = {}
      this.copies = 1
      this.selectedForms = []
    }
  }
})