<template>
  <div class="case-detail">
    <el-container>
      <el-header>
        <div class="header-content">
          <el-page-header @back="goBack" :content="`${caseInfo.caseName} - 文件编辑`" />
          <div class="header-actions">
            <el-button type="primary" @click="generateAllPDF">生成所有文件PDF</el-button>
          </div>
        </div>
      </el-header>

      <el-main>
        <!-- 案件基本信息卡片 -->
        <el-card class="info-card">
          <template #header>
            <div class="card-header">
              <span>案件基本信息</span>
            </div>
          </template>
          <el-descriptions :column="2" border>
            <el-descriptions-item label="案件编号">{{ caseInfo.caseNumber }}</el-descriptions-item>
            <el-descriptions-item label="立案日期">{{ caseInfo.date }}</el-descriptions-item>
            <el-descriptions-item label="主办律师">{{ caseInfo.lawyerName }}</el-descriptions-item>
            <el-descriptions-item label="委托人">{{ caseInfo.clientName }}</el-descriptions-item>
          </el-descriptions>
        </el-card>

        <!-- 文书列表 -->
        <div class="documents-section">
          <!-- 委托手续文书 -->
          <el-card class="document-category">
            <template #header>
              <div class="category-header">
                <span class="category-title">委托手续</span>
                <el-button type="primary" link @click="generateCategoryPDF('delegation')">
                  生成本类别PDF
                </el-button>
              </div>
            </template>
            <el-table :data="delegationDocs" style="width: 100%">
              <el-table-column prop="label" label="文件名称" width="180" />
              <el-table-column prop="status" label="状态" width="100">
                <template #default="scope">
                  <el-tag :type="scope.row.completed ? 'success' : 'info'">
                    {{ scope.row.completed ? '已完成' : '未完成' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="copies" label="打印份数" width="120">
                <template #default="scope">
                  <el-input-number
                    v-model="scope.row.copies"
                    :min="1"
                    :max="10"
                    size="small"
                  />
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template #default="scope">
                  <el-button type="primary" link @click="editDocument(scope.row)">
                    编辑文件
                  </el-button>
                  <el-button type="success" link @click="previewDocument(scope.row)">
                    预览
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>

          <!-- 诉讼文书 -->
          <el-card class="document-category">
            <template #header>
              <div class="category-header">
                <span class="category-title">诉讼文书</span>
                <el-button type="primary" link @click="generateCategoryPDF('litigation')">
                  生成本类别PDF
                </el-button>
              </div>
            </template>
            <el-table :data="litigationDocs" style="width: 100%">
              <el-table-column prop="label" label="文件名称" width="180" />
              <el-table-column prop="status" label="状态" width="100">
                <template #default="scope">
                  <el-tag :type="scope.row.completed ? 'success' : 'info'">
                    {{ scope.row.completed ? '已完成' : '未完成' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="copies" label="打印份数" width="120">
                <template #default="scope">
                  <el-input-number
                    v-model="scope.row.copies"
                    :min="1"
                    :max="10"
                    size="small"
                  />
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template #default="scope">
                  <el-button type="primary" link @click="editDocument(scope.row)">
                    编辑文件
                  </el-button>
                  <el-button type="success" link @click="previewDocument(scope.row)">
                    预览
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()

// 案件信息
const caseInfo = ref({
  caseNumber: route.params.caseNumber,
  caseName: '示例案件名称',
  date: '2025-03-21',
  lawyerName: '张律师',
  clientName: '李委托'
})

// 委托手续文书
const delegationDocs = ref([
  { key: 'official-letter', label: '所函', completed: false, copies: 1 },
  { key: 'authorization', label: '授权委托书', completed: false, copies: 1 },
  { key: 'lawyer-credentials', label: '律师证件', completed: false, copies: 1 },
  { key: 'client-info', label: '委托人身份信息', completed: false, copies: 1 },
  { key: 'corporate-info', label: '法人企业身份信息', completed: false, copies: 1 },
  { key: 'operator-info', label: '经营者身份证明书', completed: false, copies: 1 },
  { key: 'address-confirm', label: '送达地址确认书', completed: false, copies: 1 },
  { key: 'refund-account', label: '退费账户确认书', completed: false, copies: 1 }
])

// 诉讼文书
const litigationDocs = ref([
  { key: 'complaint', label: '起诉状', completed: false, copies: 1 },
  { key: 'defense', label: '答辩状', completed: false, copies: 1 }
])

// 返回主页
const goBack = () => {
  router.push('/')
}

// 编辑文档
const editDocument = (document: any) => {
  router.push({
    name: 'DocumentDetail',
    params: {
      caseNumber: caseInfo.value.caseNumber,
      documentType: document.key
    }
  })
}

// 预览文档
const previewDocument = (document: any) => {
  ElMessage.info(`${document.label}预览功能开发中...`)
}

// 生成特定类别的PDF
const generateCategoryPDF = (category: string) => {
  ElMessage.success(`正在生成${category === 'delegation' ? '委托手续' : '诉讼文书'}PDF（演示）`)
}

// 生成所有文件的PDF
const generateAllPDF = () => {
  ElMessage.success('正在生成所有文件PDF（演示）')
}
</script>

<style scoped>
.case-detail {
  padding: 20px;
}

.header-content {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info-card {
  margin-bottom: 20px;
}

.documents-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.document-category {
  margin-bottom: 20px;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-title {
  font-size: 16px;
  font-weight: bold;
}

.el-input-number {
  width: 100px;
}

.el-table {
  margin-top: 10px;
}
</style>