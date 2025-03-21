<template>
  <!-- 保持之前的主页内容不变，添加以下对话框组件 -->
  <el-dialog
    v-model="documentsDialogVisible"
    :title="`${currentCase?.caseName || ''} - 文件选择`"
    width="70%"
  >
    <div class="documents-grid">
      <!-- 委托手续文书 -->
      <el-card class="document-section">
        <template #header>
          <div class="section-header">委托手续</div>
        </template>
        <div class="document-items">
          <div
            v-for="doc in delegationDocs"
            :key="doc.key"
            class="document-item"
            @click="navigateToDocument(doc)"
          >
            <el-card shadow="hover" :body-style="{ padding: '20px' }">
              <div class="document-icon">
                <el-icon :size="24"><Document /></el-icon>
              </div>
              <div class="document-title">{{ doc.label }}</div>
              <div class="document-status">
                <el-tag :type="doc.completed ? 'success' : 'info'" size="small">
                  {{ doc.completed ? '已完成' : '待填写' }}
                </el-tag>
              </div>
            </el-card>
          </div>
        </div>
      </el-card>

      <!-- 诉讼文书 -->
      <el-card class="document-section">
        <template #header>
          <div class="section-header">诉讼文书</div>
        </template>
        <div class="document-items">
          <div
            v-for="doc in litigationDocs"
            :key="doc.key"
            class="document-item"
            @click="navigateToDocument(doc)"
          >
            <el-card shadow="hover" :body-style="{ padding: '20px' }">
              <div class="document-icon">
                <el-icon :size="24"><Document /></el-icon>
              </div>
              <div class="document-title">{{ doc.label }}</div>
              <div class="document-status">
                <el-tag :type="doc.completed ? 'success' : 'info'" size="small">
                  {{ doc.completed ? '已完成' : '待填写' }}
                </el-tag>
              </div>
            </el-card>
          </div>
        </div>
      </el-card>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Document } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const documentsDialogVisible = ref(false)
const currentCase = ref<any>(null)

interface DocumentType {
  key: string
  label: string
  completed: boolean
}

const delegationDocs = ref<DocumentType[]>([
  { key: 'official-letter', label: '所函', completed: false },
  { key: 'authorization', label: '授权委托书', completed: false },
  { key: 'lawyer-credentials', label: '律师证件', completed: false },
  { key: 'client-info', label: '委托人身份信息', completed: false },
  { key: 'corporate-info', label: '法人企业身份信息', completed: false },
  { key: 'operator-info', label: '经营者身份证明书', completed: false },
  { key: 'address-confirm', label: '送达地址确认书', completed: false },
  { key: 'refund-account', label: '退费账户确认书', completed: false }
])

const litigationDocs = ref<DocumentType[]>([
  { key: 'complaint', label: '起诉状', completed: false },
  { key: 'defense', label: '答辩状', completed: false }
])

// 修改编辑按钮的处理函数
const editCase = (caseData: any) => {
  currentCase.value = caseData
  documentsDialogVisible.value = true
}

const navigateToDocument = (doc: DocumentType) => {
  documentsDialogVisible.value = false
  router.push({
    name: 'DocumentDetail',
    params: {
      caseNumber: currentCase.value.caseNumber,
      documentType: doc.key
    }
  })
}

// ... 其他原有的代码保持不变 ...
</script>

<style scoped>
/* 添加新的样式 */
.documents-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.document-section {
  margin-bottom: 20px;
}

.section-header {
  font-size: 16px;
  font-weight: bold;
  color: #303133;
}

.document-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 10px;
}

.document-item {
  cursor: pointer;
  transition: all 0.3s;
}

.document-item:hover {
  transform: translateY(-5px);
}

.document-icon {
  text-align: center;
  color: #409EFF;
  margin-bottom: 12px;
}

.document-title {
  text-align: center;
  margin-bottom: 12px;
  font-size: 14px;
  color: #303133;
}

.document-status {
  text-align: center;
}

/* ... 其他原有的样式保持不变 ... */
</style>