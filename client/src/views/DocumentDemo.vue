<template>
  <div class="document-demo">
    <el-card class="document-card">
      <template #header>
        <div class="card-header">
          <h2>{{ getDocumentTitle }}</h2>
          <el-button type="primary" @click="goBack">返回</el-button>
        </div>
      </template>

      <div class="document-content">
        <el-form :model="formData" label-width="120px">
          <!-- 示例表单字段 -->
          <el-form-item label="案件编号">
            <el-input v-model="formData.caseNumber" disabled></el-input>
          </el-form-item>

          <el-form-item label="日期">
            <el-date-picker
              v-model="formData.date"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="内容">
            <el-input
              v-model="formData.content"
              type="textarea"
              rows="4"
              placeholder="请输入文书内容"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="saveDocument">保存</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'DocumentDemo',
  props: {
    caseNumber: {
      type: String,
      required: true
    },
    documentType: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const formData = ref({
      caseNumber: props.caseNumber,
      date: new Date(),
      content: ''
    })

    const documentTitles: Record<string, string> = {
      'search-warrant': '搜查令',
      'authorization': '授权委托书',
      'notice': '告知书',
      'record': '笔录',
      'decision': '决定书'
    }

    const getDocumentTitle = computed(() => {
      return documentTitles[props.documentType] || '未知文书'
    })

    const goBack = () => {
      router.back()
    }

    const saveDocument = () => {
      // 这里添加保存文档的逻辑
      console.log('保存文档:', formData.value)
      ElMessage.success('保存成功！')
    }

    const resetForm = () => {
      formData.value.content = ''
      formData.value.date = new Date()
    }

    return {
      formData,
      getDocumentTitle,
      goBack,
      saveDocument,
      resetForm
    }
  }
})
</script>

<style scoped>
.document-demo {
  padding: 20px;
}

.document-card {
  max-width: 1000px;
  margin: 0 auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.document-content {
  padding: 20px;
}

.el-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>