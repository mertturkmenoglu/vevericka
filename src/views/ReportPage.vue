<template>
  <v-container>
    <h1 class="font-weight-light text-center">
      <v-icon color="deep-orange" x-large>mdi-flag-outline</v-icon>
      {{ $t('report.title') }}
    </h1>
    <v-divider></v-divider>
    <div v-if="reportContent">
      <v-row justify="space-around">
        <v-col cols="12" md="4">
          <v-text-field
              v-model="postUsername"
              outlined
              dense
              flat
              disabled
              class="font-weight-light mt-3"
              prefix="@"
              color="deep-orange"
              :label="$t('report.username')"
              type="text"
          />
          <v-text-field
              v-model="postId"
              outlined
              dense
              flat
              disabled
              class="font-weight-light"
              prefix="@"
              color="deep-orange"
              :label="$t('report.post_id')"
              type="text"
          />

          <v-radio-group v-model="selectedType" dense mandatory>
            <v-radio
                v-for="report in reportTypes"
                color="deep-orange"
                :key="report.type"
                :label="report.type"
                :value="report.type"
            ></v-radio>
          </v-radio-group>

          <div class="font-weight-light mb-3">{{ $t('report.information_text') }}</div>

          <v-text-field
              v-model="reportComment"
              outlined
              dense
              flat
              class="font-weight-light"
              color="deep-orange"
              :label="$t('report.information')"
              type="text"
          />

          <v-btn block color="red" dark @click="report">
            <v-icon color="white" left>mdi-flag-outline</v-icon>
            {{ $t('report.report') }}
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <div v-else class="font-weight-light text-h5 text-center mt-3">
      {{ $t('report.report_use_help.text') }}
      <span v-html="$t('report.report_use_help.links')" />
    </div>

    <v-dialog v-model="reportDialog" width="400">
      <v-card>
        <v-card-title class="font-weight-light">
          {{ reportOk ? $t('report.dialog.title_ok') : $t('report.dialog.title_err') }}
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text class="mt-3">
          {{ reportOk ? $t('report.dialog.text_ok') : $t('report.dialog.text_err') }}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" text @click="completeReport">
            {{ $t('report.dialog.close') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue"
import {Component} from "vue-property-decorator"
import ReportService from "@/api/ReportService"

@Component({
  name: "ReportPage"
})
export default class ReportPage extends Vue {
  loading: boolean = true
  reportTypes: Array<any> = []
  postId: string | undefined = ""
  postUsername: string | undefined = ""
  selectedType: string = ""
  reportComment: string = ""
  reportOk: boolean = false
  reportDialog: boolean = false

  get reportContent() {
    return this.postId !== undefined
        && this.postUsername !== undefined
        && this.postId !== ""
        && this.postUsername !== ""
  }

  mounted() {
    this.postId = this.$route.params.postId
    this.postUsername = this.$route.params.postUsername
    this.fetchReportTypes().then(() => {
      this.selectedType = this.reportTypes[0]
      this.loading = false
    })
  }

  async fetchReportTypes() {
    const locale = this.$i18n.locale || 'en'
    this.reportTypes = await ReportService.getReportTypes(locale)
  }

  async report() {
    const locale = this.$i18n.locale || 'en'
    const responseStatus = await ReportService.createReport(
        locale,
        this.postId || "",
        this.postUsername || "",
        this.$store.state.user.username,
        this.reportComment,
        this.selectedType
    )

    this.reportOk = responseStatus === 201
    this.reportDialog = true
  }

  completeReport() {
    this.reportDialog = false
    this.$router.push("/")
  }
}
</script>

<style scoped>

</style>