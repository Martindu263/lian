<template>
  <div class="document-page">
    <el-container>
      <el-header>
        <div class="header-content">
          <el-page-header @back="goBack" :content="documentTitle" />
          <div class="header-actions">
            <span class="copies-label">打印份数：</span>
            <el-input-number
              v-model="copies"
              :min="1"
              :max="10"
              size="small"
            />
            <el-button type="primary" @click="handleSave">保存</el-button>
            <el-button type="success" @click="handlePreview">预览</el-button>
          </div>
        </div>
      </el-header>

      <el-main>
        <el-card class="document-content">
          <template #header>
            <div class="document-header">
              <h2>{{ documentTitle }}</h2>
              <div class="document-info">
                <span>案件编号：{{ route.params.caseNumber }}</span>
                <span>填写日期：{{ currentDate }}</span>
              </div>
            </div>
          </template>

          <!-- 演示用的空白页面 -->
          <div class="demo-content">
            <el-empty :description="`${documentTitle}表单开发中...`">
              <template #image>
                <el-icon style="font-size: 60px"><Document /></el-icon>
              </template>
            </el-empty>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Document } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const copies = ref(1)
const currentDate = new Date().toLocaleDateString('zh-CN')

const documentTypes: Record<string, string> = {
  'official-letter': '所函',
  'authorization': '授权委托书',
  'lawyer-credentials': '律师证件',
  'client-info': '委托人身份信息',
  'corporate-info': '法人企业身份信息',
  'operator-info': '经营者身份证明书',
  'address-confirm': '送达地址确认书',
  'refund-account': '退费账户确认书',
  'complaint': '起诉状',
  'defense': '答辩状'
}

const documentTitle = computed(() => {
  const docType = route.params.documentType as string
  return documentTypes[docType] || '未知文档'
})

const goBack = () => {
  router.go(-1)
}

const handleSave = () => {
  ElMessage.success('文档保存成功（演示）')
}

const handlePreview = () => {
  ElMessage.success('文档预览功能开发中')
}
</script>

<style scoped>
.document-page {
  padding: 20px;
}

.header-content {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.copies-label {
  color: #606266;
}

.document-content {
  min-height: calc(100vh - 140px);
}

.document-header {
  text-align: center;
}

.document-header h2 {
  margin: 0 0 16px 0;
  color: #303133;
}

.document-info {
  display: flex;
  justify-content: space-between;
  color: #606266;
  font-size: 14px;
}

.demo-content {
  padding: 40px;
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>