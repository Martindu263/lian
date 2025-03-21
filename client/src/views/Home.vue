<template>
  <div class="home">
    <el-container>
      <el-header>
        <h1>案件管理系统</h1>
      </el-header>

      <el-main>
        <el-card class="case-list">
          <template #header>
            <div class="card-header">
              <span>案件列表</span>
              <el-button type="primary" @click="addNewCase">新增案件</el-button>
            </div>
          </template>

          <el-table :data="cases" style="width: 100%">
            <el-table-column prop="caseNumber" label="案件编号" width="180" />
            <el-table-column prop="caseName" label="案件名称" width="180" />
            <el-table-column prop="createTime" label="创建时间" width="180" />
            <el-table-column prop="status" label="状态" width="100">
              <template #default="scope">
                <el-tag :type="scope.row.status === '进行中' ? 'success' : 'info'">
                  {{ scope.row.status }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button-group>
                  <el-button type="primary" @click="editCase(scope.row)">
                    编辑文书
                  </el-button>
                  <el-button type="info" @click="viewCase(scope.row)">
                    查看
                  </el-button>
                </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-main>
    </el-container>

    <!-- 文书选择对话框 -->
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Document } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const documentsDialogVisible = ref(false)
const currentCase = ref<any>(null)

// 示例案件数据
const cases = ref([
  {
    caseNumber: 'CASE2024001',
    caseName: '示例案件1',
    createTime: '2024-03-21',
    status: '进行中'
  },
  {
    caseNumber: 'CASE2024002',
    caseName: '示例案件2',
    createTime: '2024-03-21',
    status: '待处理'
  }
])

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

const addNewCase = () => {
  ElMessage.info('新增案件功能待实现')
}

const editCase = (caseData: any) => {
  currentCase.value = caseData
  documentsDialogVisible.value = true
}

const viewCase = (caseData: any) => {
  router.push({
    name: 'CaseDetail',
    params: { caseNumber: caseData.caseNumber }
  })
}

const navigateToDocument = (doc: DocumentType) => {
  documentsDialogVisible.value = false
  if (!currentCase.value) {
    ElMessage.error('未选择案件')
    return
  }

  router.push({
    name: 'DocumentDetail',
    params: {
      caseNumber: currentCase.value.caseNumber,
      documentType: doc.key
    }
  })
}
</script>

<style scoped>
.home {
  height: 100vh;
  background-color: #f5f7fa;
}

.el-header {
  background-color: #fff;
  color: #303133;
  line-height: 60px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
}

.el-header h1 {
  margin: 0;
  font-size: 20px;
}

.el-main {
  padding: 20px;
}

.case-list {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

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
</style>