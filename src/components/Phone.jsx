export default function Phone({ awake, notifShown, sheetShown, bioState, onScreenTap, onNotifClick, onApprove, onDeny }) {
  return (
    <div
      className="iphone-case stage-transition relative flex h-[360px] w-[178px] flex-col justify-between overflow-visible rounded-[38px] bg-[#17171b] p-[3px] sm:h-[432px] sm:w-[210px] lg:h-[459px] lg:w-[225px] lg:rounded-[45px] xl:h-[504px] xl:w-[246px] xl:rounded-[49px]"
      data-od-id="hero-phone"
    >
      <div className="iphone-button-action" />
      <div className="iphone-button-vol-up" />
      <div className="iphone-button-vol-down" />
      <div className="iphone-button-power" />
      <div className="iphone-button-camctl" />

      <div
        onClick={onScreenTap}
        className={`stage-transition relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-[35px] bg-black text-white lg:rounded-[42px] xl:rounded-[46px] ${awake ? 'screen-awake' : 'screen-asleep'}`}
      >
        {/* Dynamic Island */}
        <div className="absolute left-1/2 top-2.5 z-40 flex h-[24px] w-[88px] -translate-x-1/2 items-center justify-end rounded-full bg-black px-2.5 shadow-md">
          <span className="flex h-2.5 w-2.5 items-center justify-center rounded-full bg-[#0d0d18] ring-1 ring-white/10">
            <span className="h-1 w-1 rounded-full bg-[#121829]" />
          </span>
        </div>

        <div className="screen-content flex h-full w-full flex-col px-2.5 pb-1.5 pt-9">
          {/* iOS 状态栏：锁屏态左侧无时间，右侧信号/电池 */}
          <div className="flex items-center justify-end gap-[5px] px-1.5 text-white">
            <svg viewBox="0 0 17 11" className="h-[10px] w-[16px]" fill="currentColor">
              <rect x="0" y="7" width="3" height="4" rx="0.8" /><rect x="4.3" y="5" width="3" height="6" rx="0.8" /><rect x="8.6" y="3" width="3" height="8" rx="0.8" /><rect x="12.9" y="1" width="3" height="10" rx="0.8" />
            </svg>
            <svg viewBox="0 0 16 11" className="h-[10px] w-[15px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M2 4.2a9 9 0 0 1 12 0" /><path d="M4.6 6.8a5.4 5.4 0 0 1 6.8 0" /><circle cx="8" cy="9.2" r="1" fill="currentColor" stroke="none" />
            </svg>
            <svg viewBox="0 0 27 12" className="h-[11px] w-[25px]">
              <rect x="0.7" y="0.7" width="21" height="10.6" rx="3.2" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1" />
              <rect x="2.4" y="2.4" width="14" height="7.2" rx="1.8" fill="currentColor" />
              <path d="M23.5 4.2v3.6a1.9 1.9 0 0 0 0-3.6z" fill="currentColor" fillOpacity="0.6" />
            </svg>
          </div>

          {/* 锁屏时钟（iOS 26 大表盘） */}
          <div className="mt-4 text-center lg:mt-5">
            <span className="block text-[10px] font-medium tracking-wide text-white/70">9月16日 星期三</span>
            <span className="mt-0.5 block font-display text-[52px] font-extralight leading-none tracking-tight text-white sm:text-[60px] lg:text-[68px]">15:30</span>
          </div>

          {/* 通知区：Liquid Glass 推送卡 */}
          <div className="relative mt-3 flex-1">
            <button
              type="button"
              onClick={onNotifClick}
              className={`absolute inset-x-0 top-1 z-30 w-full rounded-[24px] border border-white/20 bg-white/[0.13] p-3 text-left shadow-[0_18px_44px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-500 hover:bg-white/[0.18] ${
                notifShown ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-6 opacity-0'
              }`}
            >
              <div className="mb-1 flex items-center gap-1.5">
                <img src="assets/logo/easy-unlocker-icon.svg" alt="" className="h-[18px] w-[18px] rounded-[5px]" />
                <span className="whitespace-nowrap text-[10px] font-medium uppercase tracking-wide text-white/60">easy-unlocker</span>
                <span className="ml-auto flex-shrink-0 text-[10px] text-white/50">现在</span>
              </div>
              <div className="text-[12px] font-semibold leading-snug text-white">密钥使用申请</div>
              <p className="mt-0.5 text-[11px] leading-snug text-white/80">Claude Code · 发布生产集群</p>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                <span className="whitespace-nowrap rounded-md border border-approve/40 bg-approve/20 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-approve">OPENAI_API_KEY</span>
                <span className="whitespace-nowrap text-[9px] text-white/55">轻触进行核验 ➔</span>
              </div>
            </button>
          </div>

          {/* Face ID 授权弹层 */}
          <div
            className={`absolute inset-x-0 bottom-0 z-40 flex flex-col items-center rounded-t-[28px] border-t border-white/15 bg-[#151517]/95 p-3 text-center shadow-[0_-18px_50px_rgba(0,0,0,0.55)] backdrop-blur-2xl transition-transform duration-500 lg:p-4 ${
              sheetShown ? 'translate-y-0' : 'translate-y-full'
            }`}
          >
            <div className="mb-2 h-1 w-9 rounded-full bg-white/25" />
            <span className="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-white/50">Face ID 安全核验</span>
            <h4 className="mb-1.5 text-xs font-semibold text-white lg:mb-2">授权签发瞬时密文</h4>

            <div className="mb-2 w-full space-y-1 rounded-2xl border border-white/10 bg-black/40 p-2 text-left font-mono text-[11px] lg:mb-3 lg:p-2.5">
              <div className="flex justify-between text-white/55"><span>调取方</span><span className="text-white">Claude Code</span></div>
              <div className="flex justify-between text-white/55"><span>凭据项</span><span className="font-bold text-approve">OPENAI_API_KEY</span></div>
              <div className="flex justify-between text-white/55"><span>申明事由</span><span className="text-white">发布生产集群</span></div>
            </div>

            <div className="flex w-full items-center gap-2">
              <button
                type="button"
                onClick={onApprove}
                className={`flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2.5 text-xs font-semibold shadow-lg transition-all active:scale-[0.98] ${
                  bioState === 'success'
                    ? 'bg-approve-deep text-white'
                    : 'bg-approve text-black hover:bg-[#4ae06e]'
                }`}
              >
                <svg viewBox="0 0 24 24" className={`h-4 w-4 ${bioState === 'verifying' ? 'bio-pulse' : ''}`} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 3H5a2 2 0 0 0-2 2v2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
                  <path d="M9 9v1.5M15 9v1.5M12 9v4a1.2 1.2 0 0 1-1.2 1.2" />
                  <path d="M9.6 16.6c.7.6 1.5.9 2.4.9s1.7-.3 2.4-.9" />
                </svg>
                <span>{bioState === 'success' ? '✓ 核验成功' : bioState === 'verifying' ? '面容核验中…' : '面容 ID 放行'}</span>
              </button>

              <button type="button" onClick={onDeny} className="flex-shrink-0 rounded-full border border-white/15 px-3 py-2 text-[10px] text-white/60 transition-colors hover:border-white/30 hover:text-white">
                拒绝
              </button>
            </div>
          </div>

          {/* 锁屏底部快捷键 */}
          <div className="flex items-center justify-between px-3 pb-0.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/15 text-white/85 backdrop-blur-xl">
              <svg className="h-4 w-4" viewBox="0 0 256 256" fill="currentColor"><path d="M176,24H80A16,16,0,0,0,64,40V84.69a16,16,0,0,0,4.69,11.31L96,123.31V216a16,16,0,0,0,16,16h32a16,16,0,0,0,16-16V123.31l27.31-27.31A16,16,0,0,0,192,84.69V40A16,16,0,0,0,176,24ZM80,40h96V56H80Zm96,44.69L148.69,112H107.31L80,84.69V72H176ZM144,216H112V128h32v88Z"/></svg>
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/15 text-white/85 backdrop-blur-xl">
              <svg className="h-4 w-4" viewBox="0 0 256 256" fill="currentColor"><path d="M208,56H180.28L166.65,35.56A8,8,0,0,0,160,32H96a8,8,0,0,0-6.65,3.56L75.71,56H48A24,24,0,0,0,24,80V192a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V80A24,24,0,0,0,208,56Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8H80a8,8,0,0,0,6.66-3.56L100.28,48h55.43l13.63,20.44A8,8,0,0,0,176,72h32a8,8,0,0,1,8,8ZM128,88a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,88Zm0,72a28,28,0,1,1,28-28A28,28,0,0,1,128,160Z"/></svg>
            </span>
          </div>

          {/* Home Indicator */}
          <div className="mx-auto mt-1 h-[5px] w-28 rounded-full bg-white/50" />
        </div>
      </div>
    </div>
  )
}
