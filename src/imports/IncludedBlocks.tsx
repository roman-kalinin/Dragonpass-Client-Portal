import svgPaths from "./svg-jtk10x4wgz";

function Logo() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-[164px]" data-name="Logo">
      <div className="h-[26px] relative shrink-0 w-[164px]" data-name="Dragonpass-logo">
        <div className="-translate-y-1/2 absolute aspect-[213/32] content-stretch flex flex-col items-start justify-center left-0 right-[0.19%] top-[calc(50%-0.65px)]" data-name="logos / brand / horizontal">
          <div className="aspect-[213/32] relative shrink-0 w-full" data-name="logos / brand / horizontal">
            <div className="absolute inset-0 overflow-clip" data-name="logo-base">
              <div className="absolute inset-[0_6.21%_-0.01%_0]" data-name="Dragonpass">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 153.528 24.5947">
                  <path d={svgPaths.p2677a280} fill="var(--fill-0, #1E2939)" id="Dragonpass" />
                </svg>
              </div>
              <div className="absolute inset-[0.47%_0_67.46%_95.18%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.89068 7.88787">
                  <path d={svgPaths.p1e1f3980} fill="var(--fill-0, #FB2C36)" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input() {
  return (
    <div className="absolute content-stretch flex h-[36px] items-center left-0 overflow-clip pl-[36px] pr-[12px] py-[4px] rounded-[6px] top-0 w-[448px]" data-name="Input">
      <p className="font-['Cabin:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#6a7282] text-[14px] text-center tracking-[-0.1504px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Search by name, ID, location...
      </p>
    </div>
  );
}

function LucideSearch() {
  return (
    <div className="absolute left-[10px] size-[16px] top-[10px]" data-name="lucide/search">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="lucide/search">
          <path d={svgPaths.p21ee4a00} id="Vector" stroke="var(--stroke-0, #0A2333)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[36px] relative shrink-0 w-[448px]" data-name="Container">
      <Input />
      <LucideSearch />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
      <Logo />
      <Container />
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[30px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] h-full items-center relative whitespace-nowrap">
        <p className="font-['Cabin:Bold',sans-serif] font-bold leading-[15px] relative shrink-0 text-[#0a2333] text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          42
        </p>
        <p className="font-['Cabin:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#6a7282] text-[14px] text-center tracking-[-0.1504px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Requests today
        </p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[30px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] h-full items-center relative whitespace-nowrap">
        <p className="font-['Cabin:Bold',sans-serif] font-bold leading-[15px] relative shrink-0 text-[#0a2333] text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          12m
        </p>
        <p className="font-['Cabin:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#6a7282] text-[14px] text-center tracking-[-0.1504px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Avg. resolution time
        </p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[16px] h-[32px] items-center relative shrink-0" data-name="Container">
      <Container2 />
      <Container3 />
    </div>
  );
}

function Icon() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[24px] top-1/2" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p325b63c0} id="Vector" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p10486f00} id="Vector_2" stroke="var(--stroke-0, #525252)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function TopBar1() {
  return <div className="absolute bg-[rgba(255,255,255,0)] left-[20px] rounded-[16777200px] shadow-[0px_0px_0px_0px_white] size-[8px] top-[8px]" data-name="TopBar" />;
}

function Button() {
  return (
    <div className="relative rounded-[6px] shrink-0 size-[36px]" data-name="Button">
      <Icon />
      <TopBar1 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[17px] h-full items-center relative shrink-0">
      <Container1 />
      <Button />
    </div>
  );
}

function TopBar() {
  return (
    <div className="absolute bg-white content-stretch flex h-[64px] items-center justify-between left-px px-[24px] py-[14px] top-[-0.64px] w-[1847.109px]" data-name="TopBar">
      <div aria-hidden="true" className="absolute border-[#e2e8f0] border-b border-solid inset-[0_0_-1px_0] pointer-events-none" />
      <Frame1 />
      <Frame />
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-white h-full relative rounded-[8px] shrink-0 w-[203px]" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[12px] py-[4px] relative size-full">
          <p className="font-['Cabin:Bold',sans-serif] font-bold leading-[14px] relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            New Dashboard
          </p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-white flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[8px]" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[12px] py-[4px] relative size-full">
          <p className="font-['Cabin:Regular',sans-serif] font-normal leading-[14px] relative shrink-0 text-[#0a0a0a] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Dashboard description
          </p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] h-full items-center min-h-px min-w-px relative">
      <Input1 />
      <Input2 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[13.997px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9968 13.9968">
        <g clipPath="url(#clip0_1_626)" id="Icon">
          <path d="M4.66602 1.16797V3.50078" id="Vector" stroke="var(--stroke-0, #62748E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1664" />
          <path d="M9.33105 1.16797V3.50078" id="Vector_2" stroke="var(--stroke-0, #62748E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1664" />
          <path d={svgPaths.p38c12080} id="Vector_3" stroke="var(--stroke-0, #62748E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1664" />
          <path d="M1.75 5.83203H12.2476" id="Vector_4" stroke="var(--stroke-0, #62748E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1664" />
        </g>
        <defs>
          <clipPath id="clip0_1_626">
            <rect fill="white" height="13.9968" width="13.9968" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[19.984px] relative shrink-0 w-[77.219px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Cabin:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#0a2333] text-[14px] top-[-0.16px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Last 30 Days
        </p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[13.997px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.9968 13.9968">
        <g id="Icon">
          <path d={svgPaths.p18af2500} id="Vector" stroke="var(--stroke-0, #62748E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.1664" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex gap-[7.996px] h-[33.64px] items-center pl-[12.828px] pr-[0.84px] py-[0.84px] relative rounded-[10px] shrink-0 w-[146.862px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.84px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon1 />
      <Text />
      <Icon2 />
    </div>
  );
}

function Container6() {
  return <div className="bg-[#e5e7eb] h-[23.989px] shrink-0 w-[0.998px]" data-name="Container" />;
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[15.993px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9926 15.9926">
        <g id="Icon">
          <path d={svgPaths.p1ecd1500} id="Vector" stroke="var(--stroke-0, #62748E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33272" />
          <path d={svgPaths.p14267e20} id="Vector_2" stroke="var(--stroke-0, #62748E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33272" />
          <path d="M7.99609 9.99632V2" id="Vector_3" stroke="var(--stroke-0, #62748E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33272" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[17px] py-[9px] relative rounded-[8px] shrink-0 w-[82px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon3 />
      <p className="font-['Cabin:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#0a2333] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Export
      </p>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[15.993px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9926 15.9926">
        <g id="Icon">
          <path d={svgPaths.p284eee80} id="Vector" stroke="var(--stroke-0, #62748E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33272" />
          <path d={svgPaths.p31fec600} id="Vector_2" stroke="var(--stroke-0, #62748E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33272" />
          <path d={svgPaths.p12483a80} id="Vector_3" stroke="var(--stroke-0, #62748E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33272" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[17px] py-[9px] relative rounded-[8px] shrink-0 w-[72px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon4 />
      <p className="font-['Cabin:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#0a2333] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Save
      </p>
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[15.99px] size-[15.993px] top-[9.99px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9926 15.9926">
        <g id="Icon">
          <path d="M3.3318 7.99632H12.6608" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33272" />
          <path d="M7.99632 3.3318V12.6608" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33272" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#0a2333] h-[36px] relative rounded-[8px] shadow-[0px_4px_6px_0px_rgba(28,57,142,0.1),0px_2px_4px_0px_rgba(28,57,142,0.1)] shrink-0 w-[127px]" data-name="Button">
      <Icon5 />
      <p className="-translate-x-1/2 absolute font-['Cabin:Medium',sans-serif] font-medium leading-[20px] left-[75.48px] text-[14px] text-center text-white top-[7.84px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Add Widget
      </p>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Container5 />
      <Container6 />
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="absolute content-stretch flex gap-[24px] items-center left-[389px] top-[81px] w-[1428.86px]">
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <Frame3 />
      </div>
      <Container4 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[31.998px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 31.9984 31.9984">
        <g id="Icon">
          <path d={svgPaths.p25523300} fill="var(--fill-0, #CAD5E2)" id="Vector" />
          <path d={svgPaths.p17989d00} fill="var(--fill-0, #62748E)" id="Vector_2" />
          <path d={svgPaths.p2d0e3180} fill="var(--fill-0, #CAD5E2)" id="Vector_3" />
          <path d={svgPaths.p33cb7300} fill="var(--fill-0, #62748E)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute bg-[#f1f5f9] content-stretch flex items-center justify-center left-[1051.48px] pr-[0.013px] rounded-[28197000px] size-[63.997px] top-[389px]" data-name="Container">
      <Icon6 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[19.984px] left-[879px] top-[504.98px] w-[408.968px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-['Cabin:Regular',sans-serif] font-normal leading-[20px] left-[204.5px] text-[#62748e] text-[14px] text-center top-[-0.16px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Start from scratch or choose a template to get up and running quickly.
      </p>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[15.993px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9926 15.9926">
        <g clipPath="url(#clip0_1_532)" id="Icon">
          <path d={svgPaths.p21d44d80} id="Vector" stroke="var(--stroke-0, #008236)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33272" />
          <path d={svgPaths.p3b0cca00} id="Vector_2" stroke="var(--stroke-0, #008236)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33272" />
        </g>
        <defs>
          <clipPath id="clip0_1_532">
            <rect fill="white" height="15.9926" width="15.9926" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="bg-[#f0fdf4] relative rounded-[4px] shrink-0 size-[31.998px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.013px] relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[19.984px] relative shrink-0 w-full" data-name="Text">
      <p className="absolute font-['Cabin:Bold',sans-serif] font-bold leading-[20px] left-0 text-[#0a2333] text-[14px] top-[-0.16px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Executive Overview
      </p>
    </div>
  );
}

function Text2() {
  return (
    <div className="content-stretch flex h-[15.993px] items-start relative shrink-0 w-full" data-name="Text">
      <p className="font-['Cabin:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#62748e] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        High-level KPIs and trends
      </p>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[35.977px] relative shrink-0 w-[134.703px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Text1 />
        <Text2 />
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white h-[61.633px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[11.988px] items-center pl-[11.988px] relative size-full">
          <Container9 />
          <Container10 />
        </div>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[15.993px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9926 15.9926">
        <g clipPath="url(#clip0_1_526)" id="Icon">
          <path d={svgPaths.p39cd3300} id="Vector" stroke="var(--stroke-0, #8200DB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33272" />
          <path d={svgPaths.p2554b8f0} id="Vector_2" stroke="var(--stroke-0, #8200DB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33272" />
          <path d={svgPaths.p19636e80} id="Vector_3" stroke="var(--stroke-0, #8200DB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33272" />
          <path d={svgPaths.p2678ed00} id="Vector_4" stroke="var(--stroke-0, #8200DB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33272" />
        </g>
        <defs>
          <clipPath id="clip0_1_526">
            <rect fill="white" height="15.9926" width="15.9926" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-[#faf5ff] relative rounded-[4px] shrink-0 size-[31.998px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.013px] relative size-full">
        <Icon8 />
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[19.984px] relative shrink-0 w-full" data-name="Text">
      <p className="absolute font-['Cabin:Bold',sans-serif] font-bold leading-[20px] left-0 text-[#0a2333] text-[14px] top-[-0.16px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Growth Tracking
      </p>
    </div>
  );
}

function Text4() {
  return (
    <div className="content-stretch flex h-[15.993px] items-start relative shrink-0 w-full" data-name="Text">
      <p className="font-['Cabin:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#62748e] text-[12px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        User acquisition and retention
      </p>
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[35.977px] relative shrink-0 w-[152.705px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Text3 />
        <Text4 />
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-white h-[61.633px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[11.988px] items-center pl-[11.988px] relative size-full">
          <Container11 />
          <Container12 />
        </div>
      </div>
    </div>
  );
}

function LucideLayoutDashboard() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="lucide/layout-dashboard">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="lucide/layout-dashboard">
          <g id="Vector">
            <path d={svgPaths.pff0fc00} stroke="var(--stroke-0, #62748E)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p1d76d410} stroke="var(--stroke-0, #62748E)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p2f091200} stroke="var(--stroke-0, #62748E)" strokeLinecap="round" strokeLinejoin="round" />
            <path d={svgPaths.p39897300} stroke="var(--stroke-0, #62748E)" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-[rgba(10,35,51,0.05)] content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 w-[409px]" data-name="Button">
      <LucideLayoutDashboard />
      <p className="font-['Cabin:Regular',sans-serif] font-normal leading-[21px] relative shrink-0 text-[#0a2333] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Browse all templates
      </p>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[879px] top-[556.96px] w-[408.968px]" data-name="Container">
      <Button4 />
      <Button5 />
      <Button6 />
    </div>
  );
}

function Text5() {
  return (
    <div className="h-[31.998px] relative shrink-0 w-[152.403px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Cabin:Bold',sans-serif] font-bold leading-[32px] left-0 text-[#0f172b] text-[24px] top-[-1.16px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Widget Library
        </p>
      </div>
    </div>
  );
}

function Icon9() {
  return (
    <div className="h-[19.997px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/4 left-[24.99%] right-[25.01%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6651 11.6651">
            <path d={svgPaths.p132a65e0} id="Vector" stroke="var(--stroke-0, #62748E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66645" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[24.99%] right-[25.01%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6651 11.6651">
            <path d={svgPaths.p3566b460} id="Vector" stroke="var(--stroke-0, #62748E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66645" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[27.981px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[3.992px] px-[3.992px] relative size-full">
        <Icon9 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[31.998px] relative shrink-0 w-[367.174px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Text5 />
        <Button7 />
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="h-[24.002px] relative shrink-0 w-[367.174px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Cabin:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#62748e] text-[16px] top-[-1.32px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Select a widget to preview before adding
        </p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col gap-[7.996px] h-[63.997px] items-start relative shrink-0 w-[367.174px]" data-name="Container">
      <Container15 />
      <Text6 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[15.993px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9926 15.9926">
        <g id="Icon">
          <path d={svgPaths.p6b65f20} id="Vector" stroke="var(--stroke-0, #9F9F9F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33272" />
          <path d="M11.9941 11.327V5.99609" id="Vector_2" stroke="var(--stroke-0, #9F9F9F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33272" />
          <path d="M8.66309 11.3284V3.33203" id="Vector_3" stroke="var(--stroke-0, #9F9F9F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33272" />
          <path d="M5.33105 11.3272V9.32812" id="Vector_4" stroke="var(--stroke-0, #9F9F9F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33272" />
        </g>
      </svg>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[20.995px] relative shrink-0 w-[96.914px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Cabin:Bold',sans-serif] font-bold leading-[21px] left-0 text-[#0a2333] text-[14px] top-[-0.32px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Active Members
        </p>
      </div>
    </div>
  );
}

function Text8() {
  return (
    <div className="bg-[#eff6ff] h-[17.174px] relative rounded-[4px] shrink-0 w-[27.876px]" data-name="Text">
      <div aria-hidden="true" className="absolute border-[#bedbff] border-[0.84px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6.84px] py-[1.84px] relative size-full">
        <p className="font-['Cabin:Bold',sans-serif] font-bold leading-[13.5px] relative shrink-0 text-[#1447e6] text-[9px] tracking-[0.225px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          KPI
        </p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex gap-[7.996px] h-[20.995px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon10 />
      <Text7 />
      <Text8 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[18.002px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Cabin:Regular',sans-serif] font-normal leading-[18px] left-0 text-[#62748e] text-[12px] top-[-0.16px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Members who logged in within the last 30 days
      </p>
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute h-[36.003px] left-0 top-0 w-[36.056px]" data-name="Text">
      <p className="absolute font-['Cabin:Bold',sans-serif] font-bold leading-[36px] left-0 text-[#0a2333] text-[24px] top-[-1.48px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        128
      </p>
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute h-[18.002px] left-[44.05px] top-[13.45px] w-[28.965px]" data-name="Text">
      <p className="absolute font-['Cabin:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#d4183d] text-[12px] top-[-0.16px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        -1.5%
      </p>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[36.003px] relative shrink-0 w-[73.017px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Text9 />
        <Text10 />
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="h-[31.998px] relative shrink-0 w-[179.989px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 179.989 31.9984">
        <g clipPath="url(#clip0_1_996)" id="Icon">
          <path d={svgPaths.p38e73e80} id="Vector" stroke="var(--stroke-0, #152C3C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.49991" />
        </g>
        <defs>
          <clipPath id="clip0_1_996">
            <rect fill="white" height="31.9984" width="179.989" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[95.969px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex flex-col gap-[3.992px] items-start pl-[11.988px] pt-[11.988px] relative size-full">
        <Container19 />
        <Icon11 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-[#f8fafc] content-stretch flex flex-col gap-[8px] items-start p-[17px] relative rounded-[14px] shrink-0 w-[367.174px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e2e8f0] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container17 />
      <Paragraph1 />
      <Container18 />
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute h-[35.99px] left-0 rounded-[8px] top-0 w-[367.174px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip pl-[36px] pr-[32px] relative rounded-[inherit] size-full">
        <p className="font-['Cabin:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[14px] text-[rgba(10,35,51,0.5)] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Search widget
        </p>
      </div>
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b-[0.84px] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon12() {
  return (
    <div className="absolute left-[9.99px] size-[15.993px] top-[9.99px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9926 15.9926">
        <g id="Icon">
          <path d={svgPaths.p3fcb0e00} id="Vector" stroke="var(--stroke-0, #0A2333)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33272" />
          <path d={svgPaths.p2e2e9a00} id="Vector_2" stroke="var(--stroke-0, #0A2333)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33272" />
        </g>
      </svg>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[35.99px] relative shrink-0 w-[367.174px]" data-name="Container">
      <TextInput />
      <Icon12 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[15.993px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9926 15.9926">
        <g id="Icon">
          <path d={svgPaths.p392db580} id="Vector" stroke="var(--stroke-0, #62748E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33272" />
        </g>
      </svg>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[19.498px] relative shrink-0 w-[52.679px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Cabin:SemiBold',sans-serif] font-semibold leading-[19.5px] left-[26.5px] text-[#0a2333] text-[13px] text-center top-[0.68px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Overview
        </p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[19.498px] relative shrink-0 w-[76.668px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.996px] items-center relative size-full">
        <Icon13 />
        <Text11 />
      </div>
    </div>
  );
}

function Text12() {
  return (
    <div className="bg-[#f1f5f9] h-[20.496px] relative rounded-[28197000px] shrink-0 w-[23.989px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Cabin:SemiBold',sans-serif] font-semibold leading-[16.5px] left-[12.19px] text-[#62748e] text-[11px] text-center top-[0.84px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          7
        </p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="content-stretch flex h-[40.481px] items-center justify-between relative rounded-[10px] shrink-0 w-[352.048px]" data-name="Button">
      <Container23 />
      <Text12 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p90824c0} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 11.3333V6" id="Vector_2" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.66602 11.332V3.33203" id="Vector_3" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.33398 11.3311V9.33203" id="Vector_4" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text13() {
  return (
    <div className="bg-[#eff6ff] h-[17.174px] relative rounded-[4px] shrink-0 w-[27.876px]" data-name="Text">
      <div aria-hidden="true" className="absolute border-[#bedbff] border-[0.84px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6.84px] py-[1.84px] relative size-full">
        <p className="font-['Cabin:Bold',sans-serif] font-bold leading-[13.5px] relative shrink-0 text-[#1447e6] text-[9px] tracking-[0.225px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          KPI
        </p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex gap-[7.996px] h-[18.002px] items-center relative shrink-0 w-[259.257px]" data-name="Container">
      <p className="font-['Cabin:Medium',sans-serif] font-medium leading-[18px] relative shrink-0 text-[#0a2333] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Eligible Members
      </p>
      <Text13 />
    </div>
  );
}

function Container25() {
  return (
    <div className="flex-[1_0_0] h-[34.007px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container26 />
        <p className="font-['Cabin:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#62748e] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Total count of members eligible for program benefits
        </p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[53.992px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[9.992px] items-start px-[12px] py-[8px] relative size-full">
          <Icon14 />
          <Container25 />
        </div>
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p90824c0} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 11.3333V6" id="Vector_2" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.66602 11.332V3.33203" id="Vector_3" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.33398 11.3311V9.33203" id="Vector_4" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text14() {
  return (
    <div className="bg-[#eff6ff] h-[17.174px] relative rounded-[4px] shrink-0 w-[27.876px]" data-name="Text">
      <div aria-hidden="true" className="absolute border-[#bedbff] border-[0.84px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6.84px] py-[1.84px] relative size-full">
        <p className="font-['Cabin:Bold',sans-serif] font-bold leading-[13.5px] relative shrink-0 text-[#1447e6] text-[9px] tracking-[0.225px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          KPI
        </p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex gap-[7.996px] h-[18.002px] items-center relative shrink-0 w-[259.257px]" data-name="Container">
      <p className="font-['Cabin:Medium',sans-serif] font-medium leading-[18px] relative shrink-0 text-[#0a2333] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Total Orders
      </p>
      <Text14 />
    </div>
  );
}

function Container28() {
  return (
    <div className="flex-[1_0_0] h-[34.007px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container29 />
        <p className="font-['Cabin:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#62748e] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Cumulative order count across all channels
        </p>
      </div>
    </div>
  );
}

function LucidePlus() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="lucide/plus">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="lucide/plus" opacity="0">
          <path d={svgPaths.pc9048a8} id="Vector" stroke="var(--stroke-0, #62748E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[53.992px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[9.992px] items-start px-[12px] py-[8px] relative size-full">
          <Icon15 />
          <Container28 />
          <LucidePlus />
        </div>
      </div>
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p90824c0} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 11.3333V6" id="Vector_2" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.66602 11.332V3.33203" id="Vector_3" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.33398 11.3311V9.33203" id="Vector_4" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text15() {
  return (
    <div className="bg-[#eff6ff] h-[17.174px] relative rounded-[4px] shrink-0 w-[27.876px]" data-name="Text">
      <div aria-hidden="true" className="absolute border-[#bedbff] border-[0.84px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6.84px] py-[1.84px] relative size-full">
        <p className="font-['Cabin:Bold',sans-serif] font-bold leading-[13.5px] relative shrink-0 text-[#1447e6] text-[9px] tracking-[0.225px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          KPI
        </p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[18.002px] relative shrink-0 w-[259.257px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.996px] items-center relative size-full">
        <p className="font-['Cabin:Medium',sans-serif] font-medium leading-[18px] relative shrink-0 text-[#0a2333] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Active Members
        </p>
        <Text15 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="flex-[1_0_0] h-[34.007px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container32 />
        <p className="font-['Cabin:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#62748e] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Members who logged in within the last 30 days
        </p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[53.992px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[9.992px] items-start px-[12px] py-[8px] relative size-full">
          <Icon16 />
          <Container31 />
        </div>
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p90824c0} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 11.3333V6" id="Vector_2" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.66602 11.332V3.33203" id="Vector_3" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.33398 11.3311V9.33203" id="Vector_4" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text16() {
  return (
    <div className="bg-[#eff6ff] h-[17.174px] relative rounded-[4px] shrink-0 w-[27.876px]" data-name="Text">
      <div aria-hidden="true" className="absolute border-[#bedbff] border-[0.84px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6.84px] py-[1.84px] relative size-full">
        <p className="font-['Cabin:Bold',sans-serif] font-bold leading-[13.5px] relative shrink-0 text-[#1447e6] text-[9px] tracking-[0.225px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          KPI
        </p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[18.002px] relative shrink-0 w-[259.257px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.996px] items-center relative size-full">
        <p className="font-['Cabin:Medium',sans-serif] font-medium leading-[18px] relative shrink-0 text-[#0a2333] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          FCR
        </p>
        <Text16 />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="flex-[1_0_0] h-[34.007px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Container35 />
        <p className="font-['Cabin:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#62748e] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          First contact resolution rate for support tickets
        </p>
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[53.992px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[9.992px] items-start px-[12px] py-[8px] relative size-full">
          <Icon17 />
          <Container34 />
        </div>
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p90824c0} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 11.3333V6" id="Vector_2" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.66602 11.332V3.33203" id="Vector_3" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.33398 11.3311V9.33203" id="Vector_4" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text17() {
  return (
    <div className="bg-[#eff6ff] h-[17.174px] relative rounded-[4px] shrink-0 w-[27.876px]" data-name="Text">
      <div aria-hidden="true" className="absolute border-[#bedbff] border-[0.84px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6.84px] py-[1.84px] relative size-full">
        <p className="font-['Cabin:Bold',sans-serif] font-bold leading-[13.5px] relative shrink-0 text-[#1447e6] text-[9px] tracking-[0.225px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          KPI
        </p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="h-[18.002px] relative shrink-0 w-[259.257px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.996px] items-center relative size-full">
        <p className="font-['Cabin:Medium',sans-serif] font-medium leading-[18px] relative shrink-0 text-[#0a2333] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          DAU
        </p>
        <Text17 />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Container">
      <Container38 />
      <p className="font-['Cabin:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#62748e] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Daily active users across all platform touchpoints
      </p>
    </div>
  );
}

function Frame5() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-start relative w-full">
        <Icon18 />
        <Container37 />
      </div>
    </div>
  );
}

function LucideX() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="lucide/x">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="lucide/x" opacity="0">
          <path d="M15 5L5 15M5 5L15 15" id="Vector" stroke="var(--stroke-0, #62748E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[54.002px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex gap-[9.992px] items-start px-[12px] py-[8px] relative size-full">
        <Frame5 />
        <LucideX />
      </div>
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p90824c0} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 11.3333V6" id="Vector_2" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.66602 11.332V3.33203" id="Vector_3" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.33398 11.3311V9.33203" id="Vector_4" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text18() {
  return (
    <div className="bg-[#f0fdf4] h-[17.174px] relative rounded-[4px] shrink-0 w-[43.015px]" data-name="Text">
      <div aria-hidden="true" className="absolute border-[#bbf7d0] border-[0.84px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6.84px] py-[1.84px] relative size-full">
        <p className="font-['Cabin:Bold',sans-serif] font-bold leading-[13.5px] relative shrink-0 text-[#008236] text-[9px] tracking-[0.225px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          CHART
        </p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex gap-[7.996px] h-[18.002px] items-center relative shrink-0 w-[259.257px]" data-name="Container">
      <p className="font-['Cabin:Medium',sans-serif] font-medium leading-[18px] relative shrink-0 text-[#0a2333] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Order Breakdown
      </p>
      <Text18 />
    </div>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Container">
      <Container41 />
      <p className="font-['Cabin:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#62748e] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Orders segmented by type, channel, and status
      </p>
    </div>
  );
}

function Frame6() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-start relative w-full">
        <Icon19 />
        <Container40 />
      </div>
    </div>
  );
}

function LucideX1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="lucide/x">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="lucide/x" opacity="0">
          <path d="M15 5L5 15M5 5L15 15" id="Vector" stroke="var(--stroke-0, #62748E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[54.002px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex gap-[9.992px] items-start px-[12px] py-[8px] relative size-full">
        <Frame6 />
        <LucideX1 />
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p90824c0} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 11.3333V6" id="Vector_2" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.66602 11.332V3.33203" id="Vector_3" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.33398 11.3311V9.33203" id="Vector_4" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text19() {
  return (
    <div className="bg-[#f0fdf4] h-[17.174px] relative rounded-[4px] shrink-0 w-[43.015px]" data-name="Text">
      <div aria-hidden="true" className="absolute border-[#bbf7d0] border-[0.84px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6.84px] py-[1.84px] relative size-full">
        <p className="font-['Cabin:Bold',sans-serif] font-bold leading-[13.5px] relative shrink-0 text-[#008236] text-[9px] tracking-[0.225px] uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          CHART
        </p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="h-[18.002px] relative shrink-0 w-[259.257px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.996px] items-center relative size-full">
        <p className="font-['Cabin:Medium',sans-serif] font-medium leading-[18px] relative shrink-0 text-[#0a2333] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Orders by Category
        </p>
        <Text19 />
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative" data-name="Container">
      <Container44 />
      <p className="font-['Cabin:Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#62748e] text-[11px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Order distribution across product and service categories
      </p>
    </div>
  );
}

function Frame7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-start relative w-full">
        <Icon20 />
        <Container43 />
      </div>
    </div>
  );
}

function LucideX2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="lucide/x">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="lucide/x" opacity="0">
          <path d="M15 5L5 15M5 5L15 15" id="Vector" stroke="var(--stroke-0, #62748E)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Container42() {
  return (
    <div className="h-[54.002px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex gap-[9.992px] items-start px-[12px] py-[8px] relative size-full">
        <Frame7 />
        <LucideX2 />
      </div>
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px relative">
      <Container24 />
      <Container27 />
      <Container30 />
      <Container33 />
      <Container36 />
      <Container39 />
      <Container42 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[8px] items-start pl-[10px] relative shrink-0 w-[355.16px]">
      <div className="bg-[#e2e8f0] self-stretch shrink-0 w-px" />
      <Frame9 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <Button8 />
      <Frame8 />
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[15.993px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9926 15.9926">
        <g id="Icon">
          <path d={svgPaths.p3ec0ac00} id="Vector" stroke="var(--stroke-0, #62748E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33272" />
        </g>
      </svg>
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[19.498px] relative shrink-0 w-[49.107px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Cabin:SemiBold',sans-serif] font-semibold leading-[19.5px] left-[25px] text-[#0a2333] text-[13px] text-center top-[0.68px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Financial
        </p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="h-[19.498px] relative shrink-0 w-[73.096px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.996px] items-center relative size-full">
        <Icon21 />
        <Text20 />
      </div>
    </div>
  );
}

function Text21() {
  return (
    <div className="bg-[#f1f5f9] h-[20.496px] relative rounded-[28197000px] shrink-0 w-[25.683px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Cabin:SemiBold',sans-serif] font-semibold leading-[16.5px] left-[13px] text-[#62748e] text-[11px] text-center top-[0.84px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          12
        </p>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="content-stretch flex h-[40.481px] items-center justify-between relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container45 />
      <Text21 />
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[15.993px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9926 15.9926">
        <g id="Icon">
          <path d={svgPaths.p3ec0ac00} id="Vector" stroke="var(--stroke-0, #62748E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33272" />
        </g>
      </svg>
    </div>
  );
}

function Text22() {
  return (
    <div className="h-[19.498px] relative shrink-0 w-[119.827px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Cabin:SemiBold',sans-serif] font-semibold leading-[19.5px] left-[60px] text-[#0a2333] text-[13px] text-center top-[0.68px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Member Engagement
        </p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="h-[19.498px] relative shrink-0 w-[143.816px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.996px] items-center relative size-full">
        <Icon22 />
        <Text22 />
      </div>
    </div>
  );
}

function Text23() {
  return (
    <div className="bg-[#f1f5f9] h-[20.496px] relative rounded-[28197000px] shrink-0 w-[27.626px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Cabin:SemiBold',sans-serif] font-semibold leading-[16.5px] left-[14px] text-[#62748e] text-[11px] text-center top-[0.84px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          10
        </p>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="content-stretch flex h-[40.481px] items-center justify-between relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container46 />
      <Text23 />
    </div>
  );
}

function Icon23() {
  return (
    <div className="relative shrink-0 size-[15.993px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9926 15.9926">
        <g id="Icon">
          <path d={svgPaths.p3ec0ac00} id="Vector" stroke="var(--stroke-0, #62748E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33272" />
        </g>
      </svg>
    </div>
  );
}

function Text24() {
  return (
    <div className="h-[19.498px] relative shrink-0 w-[121.901px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Cabin:SemiBold',sans-serif] font-semibold leading-[19.5px] left-[61px] text-[#0a2333] text-[13px] text-center top-[0.68px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Program Performance
        </p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="h-[19.498px] relative shrink-0 w-[145.89px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.996px] items-center relative size-full">
        <Icon23 />
        <Text24 />
      </div>
    </div>
  );
}

function Text25() {
  return (
    <div className="bg-[#f1f5f9] h-[20.496px] relative rounded-[28197000px] shrink-0 w-[23.989px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Cabin:SemiBold',sans-serif] font-semibold leading-[16.5px] left-[12.39px] text-[#62748e] text-[11px] text-center top-[0.84px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          9
        </p>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="content-stretch flex h-[40.481px] items-center justify-between relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container47 />
      <Text25 />
    </div>
  );
}

function Icon24() {
  return (
    <div className="relative shrink-0 size-[15.993px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9926 15.9926">
        <g id="Icon">
          <path d={svgPaths.p3ec0ac00} id="Vector" stroke="var(--stroke-0, #62748E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33272" />
        </g>
      </svg>
    </div>
  );
}

function Text26() {
  return (
    <div className="h-[19.498px] relative shrink-0 w-[39.312px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Cabin:SemiBold',sans-serif] font-semibold leading-[19.5px] left-[20px] text-[#0a2333] text-[13px] text-center top-[0.68px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          Supply
        </p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="h-[19.498px] relative shrink-0 w-[63.301px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[7.996px] items-center relative size-full">
        <Icon24 />
        <Text26 />
      </div>
    </div>
  );
}

function Text27() {
  return (
    <div className="bg-[#f1f5f9] h-[20.496px] relative rounded-[28197000px] shrink-0 w-[23.989px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Cabin:SemiBold',sans-serif] font-semibold leading-[16.5px] left-[12.02px] text-[#62748e] text-[11px] text-center top-[0.84px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          5
        </p>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="content-stretch flex h-[40.481px] items-center justify-between relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <Container48 />
      <Text27 />
    </div>
  );
}

function Container21() {
  return (
    <div className="h-[649.304px] relative shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-start px-[16px] relative size-full">
          <Container22 />
          <Button9 />
          <Button10 />
          <Button11 />
          <Button12 />
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-[399.16px]">
      <Container20 />
      <Container21 />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[12px] h-[1089px] items-center left-0 overflow-clip p-[16px] top-[64px] w-[404px]" data-name="Container">
      <Container14 />
      <Container16 />
      <Frame4 />
    </div>
  );
}

export default function IncludedBlocks() {
  return (
    <div className="bg-[#f9fafb] relative size-full" data-name="Included blocks">
      <TopBar />
      <Frame2 />
      <Container7 />
      <p className="-translate-x-1/2 absolute font-['Cabin:Bold',sans-serif] font-bold leading-[28px] left-[1083.78px] text-[#0a2333] text-[18px] text-center top-[468.51px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Build your dashboard
      </p>
      <Paragraph />
      <Container8 />
      <Container13 />
    </div>
  );
}