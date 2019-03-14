<template>
  <div class="guest-list-page">
    <el-row style="margin-bottom: 2rem">
      <el-col :span="12">
        <div style="font-size: 1.4rem">微信公众号管理/{{weixinName}}</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <button class="treeBtn" @click="back()" style="float: left">《 返回</button>
      </el-col>
    </el-row>
    <!--微信菜单树状图-->
    <div class="block">
      <!--上层-->
      <div class="content_top">
        <div class="content_top_left">
          <div class="weixinTitle">{{weixinName}}</div>
          <div class="threeBtnForClick">

            <!--第二版本-->
            <div class="sortBorderStyle" v-for="it in menuList">
              <el-popover
                placement="top-start"
                class="btnFirst"
                offset="50"
                width="130"
                trigger="click">
                <div v-for="item in it.children" style="" >
                  <div class="newBoxStyle" style="display: flex;flex-direction: row;height: 2rem;border-bottom: 1px solid #e0e6ed">
                    <div class="newBoxNameStyle" style="width: 5rem;text-align: center;line-height: 2rem" @click="menuSecondBtn(item.id)">
                      <a style="text-decoration: none;color: black">{{item.name}}</a>
                    </div>
                    <input type="number" class="boxInputStyle" style="width: 3rem" v-show="needSortMenu" :id="item.id" @blur="getInfo($event)" :value="item.sequence">
                  </div>

                </div>
                <div style="height: 2rem;margin-top: 1rem" v-show="it.canCreateChild === true">
                  <div style="border:1px solid #e0e6ed;width: 100%;text-align: center;line-height: 2rem;float: left" @click="menuSecondBtn(it)">
                    <a style="text-decoration: none;color: black">+</a>
                  </div>
                </div>
                <el-button style="border:none" slot="reference"  @click="menuFirstBtn(it)">{{ menuList.length < 1 ?  '+'  : it.name}}</el-button>
              </el-popover>
              <input type="number" class="sortInputStyle" v-show="needSortMenu" :id="it.id" @blur="getInfo($event)" v-if="it.name !== '+'" :value="it.sequence">
            </div>

          </div>

          <!--第三版本-->
          <!--<div class="newThreeBtnForClick" >-->
            <!--<div class="newsortBorderStyle" v-for="it in menuList">-->
              <!--&lt;!&ndash;二级菜单内容&ndash;&gt;-->
              <!--<div class="newMenuShowBorder" >-->
                <!--<div class="newMenuContentBorder" >-->
                  <!--<div v-show="false" v-for="item in it.children">-->
                    <!--<div class="newItemContentStyle">-->
                      <!--<div class="newMenuNameStyleFor">-->
                        <!--<p class="newMenuNameFont">{{item.name}}</p>-->
                      <!--</div>-->
                      <!--<div class="newSortSecondInputBorder">-->
                        <!--&lt;!&ndash;<input type="text" class="newSortSecondInput">&ndash;&gt;-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
                <!--<div class="newTakeAddSecondBtn" v-show="it.canCreateChild === true">-->
                  <!--<a class="addSecondBtnFor">+</a>-->
                <!--</div>-->
              <!--</div>-->
              <!--&lt;!&ndash;一级菜单内容&ndash;&gt;-->
              <!--<div class="newMenuFirstBtnBorder">-->
                <!--&lt;!&ndash;<div>点击</div>&ndash;&gt;-->
                <!--<a class="newAddFirstBtnStyle">{{it.name}}</a>-->
                <!--<input type="text" class="newSortInputFor" v-show="false">-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->




        </div>
        <!--向右图标-->
        <div class="bitRight">
          <img src="../../../static/images/main/takeRight22.png" alt="" class="rightImages" v-show="changeMenu">
        </div>
        <div class="content_top_right">
          <!--一级菜单修改-->
          <div class="changeContentStyle" v-show="changeOneMenu">
            <div class="changeContentTopStyle">
              <div class="changeContentOldName">{{menuNameForOne}}</div>
              <div class="changeContentDel">
                <a style="color: #00a0e9;text-decoration: none" @click="deleteThisOneMenu()">删除菜单</a>
              </div>
            </div>
            <div class="changeContentBottomStyle">
              <p class="changeContentBottomTitleStyle">已添加子菜单，仅可设置菜单名称。</p>
              <el-form ref="changeForm" :model="changeForm" :rules="changeFormrules" label-width="90px" class="changeContentBottomChangeFormStyle">
                <el-form-item label="菜单名称:" prop="name">
                  <el-input v-model="changeForm.name" maxlength="8" style="width: 18rem"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <!--一级添加或者二级修改添加-->
          <div class="changeContentStyle" v-show="addOrChangeOneAndTwo">
            <div class="changeContentTopStyle">
              <div class="changeContentOldName">{{menuNameForTow}}</div>
              <div class="changeContentDel">
                <a style="color: #00a0e9;text-decoration: none" @click="deleteThisOneMenu()">删除菜单</a>
              </div>
            </div>
            <div class="changeContentBottomStyle">
              <el-form ref="changeForm" :model="changeForm" :rules="changeFormrules" label-width="90px" class="changeContentBottomChangeFormStyle">
                <el-form-item label="菜单名称:" prop="name">
                  <el-input v-model="changeForm.name" style="width: 18rem"></el-input>
                </el-form-item>
                <el-form-item label="菜单内容:">
                  <div></div>
                </el-form-item>
                <div class="changeContentRightBtn">
                  <div>
                    <a class="bottomContentAddBottomFontAStyle" :class="colorLink" style="text-decoration: none; font-size: 1rem;" @click="chooseLinkBtn">链接</a>
                  </div>
                  <div>
                    <a class="bottomContentAddBottomFontBStyle" :class="colorPass" style="text-decoration: none; font-size: 1rem;" @click="choosePassBtn">图文回复</a>
                  </div>
                </div>

              </el-form>
            </div>
            <div class="changeContentBottomStyle" style="border-top: 0.2rem solid #EEEEEE;">
              <el-form style="margin-left: 1.5rem;">
                <el-form-item label="图文标题:" class="changeContentRightAddLast" v-show="changeInputOne">
                  <template>

                    <div>
                      <el-input placeholder="请输入内容" v-model="checkInText" style="width: 15rem">
                        <el-button slot="append" icon="el-icon-search" @click="cheInfoForText()"></el-button>
                      </el-input>
                      <div style="float: right;margin-right: 1rem" @click="addTextWordBtn">
                        <a style="text-decoration: none;color: #00a0e9">添加图文回复</a>
                      </div>
                      <div class="checkBorder" v-show="cheOutBack" >
                        <el-radio-group  v-for="item in restaurants" :key="item.id" v-model="radio2" style="display: flex;flex-direction: column">
                          <li class="itemStyle" @click="chooseThisTitle(item)">
                            <!--<div class="backTenter">{{item.title}}</div>-->
                            <el-radio :label="item.id" style="float: left">{{item.title}}</el-radio>
                          </li>
                        </el-radio-group >
                      </div>
                    </div>

                  </template>
                  <!--<el-button type="primary" @click="cheInfoForText()">查询啊</el-button>-->

                </el-form-item>
                <el-form-item label="链接地址:" v-show="changeInputTwo">
                  <el-input v-model="changeForm.url" style="width: 18rem"></el-input>
                </el-form-item>
              </el-form>

            </div>
          </div>
        </div>
      </div>

    </div>
    <el-row style="margin-top: 6rem" v-show="btnMenuFirst">
      <el-col :span="12">
        <el-button type="primary"  style="float: left;margin-left: 15rem;" @click="sortInputBtn()">排序</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 6rem" v-show="btnMenuSecond">
      <el-col :span="12">
        <el-button type="primary"  style="float: left;margin-left: 15rem;" @click="postSortInfoFor()">完成</el-button>
      </el-col>
    </el-row>
    <el-row class="bottomBtnStyle" v-show="btnMenuThird">
      <el-col :span="14">
        <el-button type="primary" @click="addMenuPastTo()" style="float: right">同步</el-button>
        <el-button type="primary" @click="submitForm()" style="float: right;margin-right: 8rem">保存</el-button>
        <el-button @click="cancel()" style="float: right;margin-right: 8rem">取 消</el-button>
      </el-col>
    </el-row>

    <!--删除弹页-->
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="30%"
     >
      <div class="deletContent">
        <img src="../../../static/images/main/deletPink.png" alt="" class="deletImage">
        <div class="deletContentText">
          <div class="deletTitleStyle">删除确认</div>
          <div class="deletFontStyle">删除"{{deleteMenuNameFor}}"菜单下设置的内容将会被删除</div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleFalse">取 消</el-button>
        <el-button type="primary" @click="dialogVisiblesure">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script src="@/assets/js/werMenuSetting/treeMap.js"></script>

<style lang="scss" scoped src="@/assets/css/werMenuSetting/treeMap.scss"></style>
