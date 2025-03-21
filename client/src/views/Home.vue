<template>
  <div class="home">
    <el-container>
      <el-header>
        <h1>立案文件管理系统</h1>
      </el-header>

      <el-main>
        <el-card>
          <template #header>
            <div class="card-header">
              <span>文件生成设置</span>
            </div>
          </template>

          <el-form :model="formConfig" label-width="120px">
            <el-form-item label="打印份数">
              <el-input-number v-model="formConfig.copies" :min="0" :max="10" />
            </el-form-item>

            <!-- 委托手续部分 -->
            <el-divider>委托手续</el-divider>
            <el-form-item>
              <el-checkbox-group v-model="formConfig.delegationForms">
                <el-checkbox label="official-letter">所函</el-checkbox>
                <el-checkbox label="authorization">授权委托书</el-checkbox>
                <el-checkbox label="lawyer-credentials">律师证件</el-checkbox>
                <el-checkbox label="client-info">委托人身份信息</el-checkbox>
                <el-checkbox label="corporate-info">法人企业身份信息</el-checkbox>
                <el-checkbox label="operator-info">经营者身份证明书</el-checkbox>
                <el-checkbox label="address-confirm">送达地址确认书</el-checkbox>
                <el-checkbox label="refund-account">退费账户确认书</el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <!-- 诉讼文书部分 -->
            <el-divider>诉讼文书</el-divider>
            <el-form-item>
              <el-checkbox-group v-model="formConfig.litigationForms">
                <el-checkbox label="complaint">起诉状</el-checkbox>
                <el-checkbox label="defense">答辩状</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>

          <!-- 生成按钮 -->
          <div class="generate-actions">
            <el-button
              type="primary"
              @click="generatePDF"
              :disabled="!hasSelectedForms"
            >
              生成PDF文件
            </el-button>
            <el-button
              type="success"
              @click="printForms"
              :disabled="!hasSelectedForms || formConfig.copies === 0"
            >
              打印文件 ({{ formConfig.copies }}份)
            </el-button>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

const formConfig = ref({
  copies: 1,
  delegationForms: [],
  litigationForms: []
})

const hasSelectedForms = computed(() => {
  return formConfig.value.delegationForms.length > 0 ||
         formConfig.value.litigationForms.length > 0
})

const generatePDF = () => {
  ElMessage.success('PDF生成功能开发中')
}

const printForms = () => {
  ElMessage.success(`准备打印 ${formConfig.value.copies} 份文件`)
}
</script>

<style scoped>
.home {
  padding: 20px;
}

.el-header {
  text-align: center;
  line-height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
}

.el-header h1 {
  margin: 0;
  color: #303133;
}

.generate-actions {
  margin-top: 20px;
  text-align: center;
}

.generate-actions .el-button {
  margin: 0 10px;
}

.el-divider {
  margin: 24px 0;
}
</style>