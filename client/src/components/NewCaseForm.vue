<template>
  <el-dialog
    title="新建案件"
    v-model="dialogVisible"
    width="50%"
  >
    <el-form :model="caseForm" :rules="rules" ref="caseFormRef" label-width="120px">
      <el-form-item label="案件名称" prop="caseName">
        <el-input v-model="caseForm.caseName" placeholder="请输入案件名称"></el-input>
      </el-form-item>

      <el-form-item label="主办律师" prop="lawyerName">
        <el-input v-model="caseForm.lawyerName" placeholder="请输入主办律师姓名"></el-input>
      </el-form-item>

      <el-form-item label="委托人" prop="clientName">
        <el-input v-model="caseForm.clientName" placeholder="请输入委托人姓名"></el-input>
      </el-form-item>

      <el-form-item label="立案日期" prop="date">
        <el-date-picker
          v-model="caseForm.date"
          type="date"
          placeholder="选择日期"
          format="YYYY-MM-DD"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'

const dialogVisible = ref(false)
const caseFormRef = ref<FormInstance>()

const caseForm = reactive({
  caseName: '',
  lawyerName: '',
  clientName: '',
  date: '',
})

const rules = {
  caseName: [{ required: true, message: '请输入案件名称', trigger: 'blur' }],
  lawyerName: [{ required: true, message: '请输入主办律师姓名', trigger: 'blur' }],
  clientName: [{ required: true, message: '请输入委托人姓名', trigger: 'blur' }],
  date: [{ required: true, message: '请选择立案日期', trigger: 'change' }],
}

const generateCaseNumber = (date: Date, lawyerName: string, clientName: string) => {
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '')
  const lawyerInitial = lawyerName.charAt(0)
  const clientInitial = clientName.charAt(0)
  return `${dateStr}-${lawyerInitial}${clientInitial}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`
}

const handleSubmit = async () => {
  if (!caseFormRef.value) return

  await caseFormRef.value.validate((valid) => {
    if (valid) {
      const caseNumber = generateCaseNumber(
        new Date(caseForm.date),
        caseForm.lawyerName,
        caseForm.clientName
      )

      // Emit the new case data to parent
      emit('create', {
        ...caseForm,
        caseNumber,
        createdAt: new Date().toISOString(),
      })

      dialogVisible.value = false
    }
  })
}

const emit = defineEmits(['create'])

defineExpose({
  dialogVisible
})
</script>