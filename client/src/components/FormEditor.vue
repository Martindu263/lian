<template>
  <div class="form-editor">
    <el-form
      :model="formData"
      :rules="rules"
      ref="formRef"
      label-width="120px"
    >
      <slot></slot>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit">
          保存
        </el-button>
        <el-button @click="handlePreview">
          预览
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['submit', 'preview'])
const formRef = ref(null)
const formData = ref({})

const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate((valid: boolean) => {
    if (valid) {
      emit('submit', formData.value)
    }
  })
}

const handlePreview = () => {
  emit('preview', formData.value)
}
</script>