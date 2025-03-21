<template>
  <div class="case-detail">
    <el-card class="case-card">
      <template #header>
        <div class="card-header">
          <h2>案件详情 - {{ caseNumber }}</h2>
          <el-button type="primary" @click="showDocumentOptions">
            编辑文书
          </el-button>
        </div>
      </template>

      <!-- 案件基本信息展示区域 -->
      <div class="case-info">
        <!-- 这里可以添加案件的基本信息展示 -->
      </div>

      <!-- 文书选择对话框 -->
      <el-dialog
        v-model="dialogVisible"
        title="选择文书类型"
        width="30%"
      >
        <div class="document-options">
          <el-button
            v-for="doc in documentTypes"
            :key="doc.type"
            type="primary"
            plain
            class="doc-button"
            @click="navigateToDocument(doc.type)"
          >
            {{ doc.name }}
          </el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'CaseDetail',
  props: {
    caseNumber: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const dialogVisible = ref(false)

    // 文书类型列表
    const documentTypes = [
      { type: 'search-warrant', name: '搜查令' },
      { type: 'authorization', name: '授权委托书' },
      { type: 'notice', name: '告知书' },
      { type: 'record', name: '笔录' },
      { type: 'decision', name: '决定书' }
    ]

    // 显示文档选择对话框
    const showDocumentOptions = () => {
      dialogVisible.value = true
    }

    // 导航到对应的文书页面
    const navigateToDocument = (documentType: string) => {
      router.push({
        name: 'DocumentDetail',
        params: {
          caseNumber: props.caseNumber,
          documentType: documentType
        }
      })
      dialogVisible.value = false
    }

    return {
      dialogVisible,
      documentTypes,
      showDocumentOptions,
      navigateToDocument
    }
  }
})
</script>

<style scoped>
.case-detail {
  padding: 20px;
}

.case-card {
  max-width: 1200px;
  margin: 0 auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.document-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  padding: 10px;
}

.doc-button {
  width: 100%;
  height: 40px;
}
</style>