import svgPaths from "./svg-ghfhkdd094";
import imgPrimitiveImg from "figma:asset/56d9e68ccff12413f144bdf75269165f5e84005a.png";

function Logo() {
  return (
    <div className="content-stretch flex flex-col items-start pt-[4px] relative shrink-0 w-[164px]" data-name="Logo">
      <div className="h-[26px] relative shrink-0 w-[164px]" data-name="Dragonpass-logo">
        <div className="-translate-y-1/2 absolute aspect-[213/32] content-stretch flex flex-col items-start justify-center left-0 right-[0.19%] top-[calc(50%-0.65px)]" data-name="logos / brand / horizontal">
          <div className="aspect-[213/32] relative shrink-0 w-full" data-name="logos / brand / horizontal">
            <div className="absolute inset-0 overflow-clip" data-name="logo-base">
              <div className="absolute inset-[0_6.21%_-0.01%_0]" data-name="Dragonpass">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 153.528 24.5947">
                  <path d={svgPaths.p120afe00} fill="var(--fill-0, #1E2939)" id="Dragonpass" />
                </svg>
              </div>
              <div className="absolute inset-[0.47%_0_67.46%_95.18%]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.89067 7.88787">
                  <path d={svgPaths.p1e4d1b00} fill="var(--fill-0, #FB2C36)" id="Vector" />
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

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.pff0fc00} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p2f972800} fill="var(--fill-0, white)" id="Vector_2" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p33130580} fill="var(--fill-0, white)" id="Vector_3" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p13a74540} fill="var(--fill-0, white)" id="Vector_4" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="content-stretch flex items-center justify-center overflow-clip py-[8px] relative rounded-[6px] shrink-0 size-[52px]" data-name="Button">
      <Icon1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_1_599)" id="Icon">
          <path d={svgPaths.p23cfd780} fill="var(--fill-0, white)" id="Vector" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p10717780} fill="var(--fill-0, white)" id="Vector_2" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" />
          <g id="Vector_3">
            <path d={svgPaths.pf121080} fill="var(--fill-0, white)" />
            <path d={svgPaths.pf121080} stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_599">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="content-stretch flex items-center justify-center py-[8px] relative rounded-[6px] shrink-0 size-[52px]" data-name="Button">
      <Icon2 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p90824c0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 11.3333V6" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.66699 11.332V3.33203" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.33301 11.332V9.33203" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#0a2333] content-stretch flex items-center justify-center py-[8px] relative rounded-[6px] shrink-0 size-[52px]" data-name="Button">
      <Icon3 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <Button1 />
        <Button2 />
        <Button3 />
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#cad5e2] border-b border-dashed inset-0 pointer-events-none" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center pb-[13px] pt-[12px] px-[12px] relative w-full">
          <Frame8 />
        </div>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2b7f5980} id="Vector" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.pc415a00} id="Vector_2" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="content-stretch flex items-center justify-center py-[8px] relative rounded-[6px] shrink-0 size-[52px]" data-name="Button">
      <Icon4 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 2V10" id="Vector" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p34116ba0} id="Vector_2" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p1fe50c00} id="Vector_3" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3c72c380} id="Vector_4" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="content-stretch flex items-center justify-center py-[8px] relative rounded-[6px] shrink-0 size-[52px]" data-name="Button">
      <Icon5 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p39559880} id="Vector" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p19551500} id="Vector_2" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3f8e7d80} id="Vector_3" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p3747f2c0} id="Vector_4" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="content-stretch flex items-center justify-center py-[8px] relative rounded-[6px] shrink-0 size-[52px]" data-name="Button">
      <Icon6 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative">
        <Button4 />
        <Button5 />
        <Button6 />
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#cad5e2] border-b border-dashed inset-0 pointer-events-none" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center pb-[13px] pt-[12px] px-[12px] relative w-full">
          <Frame9 />
        </div>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.pbd52772} id="Vector" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p28db2b80} id="Vector_2" stroke="var(--stroke-0, #45556C)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="h-[52px] relative rounded-[6px] shrink-0 w-full" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center py-[8px] relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#cad5e2] border-b border-dashed inset-0 pointer-events-none" />
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center pb-[13px] pt-[12px] px-[12px] relative w-full">
          <Button7 />
        </div>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <Frame5 />
        <Frame6 />
        <Frame7 />
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-col items-center overflow-clip relative shrink-0 w-full">
      <Frame4 />
    </div>
  );
}

function PrimitiveImg() {
  return (
    <div className="relative rounded-[99px] shrink-0 size-[32px]" data-name="Primitive.img">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[99px] size-full" src={imgPrimitiveImg} />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="absolute left-[22px] size-[10px] top-[22px]">
          <div className="absolute inset-[-20%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
              <circle cx="7" cy="7" fill="var(--fill-0, #00A63E)" id="Ellipse 1" r="6" stroke="var(--stroke-0, white)" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[2px] items-start justify-center leading-[normal] relative text-center tracking-[-0.1504px] whitespace-nowrap">
        <p className="font-['Cabin:Bold',sans-serif] font-bold relative shrink-0 text-[#0a2333] text-[16px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Alex Morgan
        </p>
        <p className="font-['Cabin:Regular',sans-serif] font-normal relative shrink-0 text-[#6a7282] text-[14px]" style={{ fontVariationSettings: "'wdth' 100" }}>
          Senior Agent
        </p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[36px] relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] h-full items-center relative">
        <PrimitiveImg />
        <Frame2 />
      </div>
    </div>
  );
}

function LucideChevronDown() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="lucide/chevron-down">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="lucide/chevron-down">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Section() {
  return (
    <div className="relative shrink-0 w-full" data-name="Section">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] py-[16px] relative w-full">
          <Container5 />
          <LucideChevronDown />
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-between overflow-clip relative rounded-[inherit] size-full">
        <Frame3 />
        <Section />
      </div>
    </div>
  );
}

function RequestDetail() {
  return (
    <div className="bg-white content-stretch flex flex-col h-[1952px] items-start p-px relative shrink-0 w-[73px]" data-name="RequestDetail">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.04)] border-solid inset-0 pointer-events-none" />
      <Container4 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <p className="font-['Cabin:Bold',sans-serif] font-bold leading-[32px] relative shrink-0 text-[#0f172b] text-[24px] w-[265px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        Analytics
      </p>
      <p className="font-['Cabin:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#62748e] text-[16px] w-[265px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        View and manage all customer orders across trips
      </p>
    </div>
  );
}

function Input1() {
  return (
    <div className="absolute content-stretch flex h-[36px] items-center left-0 overflow-clip pl-[36px] pr-[12px] py-[4px] rounded-[6px] top-0 w-[448px]" data-name="Input">
      <p className="font-['Cabin:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#6a7282] text-[14px] text-center tracking-[-0.1504px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Search dashboard
      </p>
    </div>
  );
}

function LucideSearch1() {
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

function Container6() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-b border-solid inset-0 pointer-events-none" />
      <Input1 />
      <LucideSearch1 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start relative w-full">
        <Frame12 />
        <Container6 />
      </div>
    </div>
  );
}

function TabOverview() {
  return (
    <div className="h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="Tab: Overview">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center pl-[12px] py-[8px] relative size-full">
          <p className="font-['Cabin:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#6a7282] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Overview
          </p>
        </div>
      </div>
    </div>
  );
}

function TabUserEngagement() {
  return (
    <div className="h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="Tab: User Engagement">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center pl-[12px] py-[8px] relative size-full">
          <p className="font-['Cabin:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#6a7282] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Financial
          </p>
        </div>
      </div>
    </div>
  );
}

function TabProgramPerformance() {
  return (
    <div className="h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="Tab: Program Performance">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center pl-[12px] py-[8px] relative size-full">
          <p className="font-['Cabin:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#6a7282] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            User Engagement
          </p>
        </div>
      </div>
    </div>
  );
}

function TabFinancial() {
  return (
    <div className="h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="Tab: Financial">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center pl-[12px] py-[8px] relative size-full">
          <p className="font-['Cabin:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#6a7282] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Program Performance
          </p>
        </div>
      </div>
    </div>
  );
}

function TabSupply() {
  return (
    <div className="h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="Tab: Supply">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center pl-[12px] py-[8px] relative size-full">
          <p className="font-['Cabin:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#6a7282] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Supply
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame10() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start justify-center relative shrink-0 w-full">
      <TabOverview />
      <TabUserEngagement />
      <TabProgramPerformance />
      <TabFinancial />
      <TabSupply />
    </div>
  );
}

function Frame13() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start relative w-full">
        <p className="font-['Cabin:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#6a7282] text-[12px] text-center uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          System
        </p>
        <Frame10 />
      </div>
    </div>
  );
}

function TabFinancial1() {
  return (
    <div className="h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="Tab: Financial">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center pl-[12px] py-[8px] relative size-full">
          <p className="font-['Cabin:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#6a7282] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Program Performance
          </p>
        </div>
      </div>
    </div>
  );
}

function TabSupply1() {
  return (
    <div className="h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="Tab: Supply">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center pl-[12px] py-[8px] relative size-full">
          <p className="font-['Cabin:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#6a7282] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            Supply
          </p>
        </div>
      </div>
    </div>
  );
}

function TabSupply2() {
  return (
    <div className="bg-[#f1f5f9] h-[36px] relative rounded-[6px] shrink-0 w-full" data-name="Tab: Supply">
      <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-center px-[12px] py-[8px] relative size-full">
          <p className="font-['Cabin:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#0a2333] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
            New dashboard
          </p>
        </div>
      </div>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full">
      <TabFinancial1 />
      <TabSupply1 />
      <TabSupply2 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start justify-center relative shrink-0 w-full">
      <Frame18 />
      <div className="bg-white h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
        <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center px-[17px] py-[9px] relative size-full">
            <p className="font-['Cabin:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#0a2333] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
              + New dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame14() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start relative w-full">
        <p className="font-['Cabin:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#6a7282] text-[12px] text-center uppercase whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
          saved views
        </p>
        <Frame16 />
      </div>
    </div>
  );
}

function Frame11() {
  return (
    <div className="bg-white h-[1089px] relative shrink-0 w-[291px]">
      <div className="content-stretch flex flex-col gap-[24px] items-start overflow-clip p-[17px] relative rounded-[inherit] size-full">
        <Frame15 />
        <Frame13 />
        <div className="bg-[#e5e5e5] h-px shrink-0 w-full" />
        <Frame14 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.04)] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function Frame17() {
  return (
    <div className="absolute content-stretch flex items-start left-0 top-[64px]">
      <RequestDetail />
      <Frame11 />
    </div>
  );
}

function Input2() {
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

function Input3() {
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

function Frame20() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[12px] h-full items-center min-h-px min-w-px relative">
      <Input2 />
      <Input3 />
    </div>
  );
}

function Icon8() {
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

function Icon9() {
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

function Container8() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex gap-[7.996px] h-[33.64px] items-center pl-[12.828px] pr-[0.84px] py-[0.84px] relative rounded-[10px] shrink-0 w-[146.862px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-[0.84px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon8 />
      <Text />
      <Icon9 />
    </div>
  );
}

function Container9() {
  return <div className="bg-[#e5e7eb] h-[23.989px] shrink-0 w-[0.998px]" data-name="Container" />;
}

function Icon10() {
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

function Button8() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[17px] py-[9px] relative rounded-[8px] shrink-0 w-[82px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon10 />
      <p className="font-['Cabin:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#0a2333] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Export
      </p>
    </div>
  );
}

function Icon11() {
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

function Button9() {
  return (
    <div className="bg-white content-stretch flex gap-[8px] h-[36px] items-center justify-center px-[17px] py-[9px] relative rounded-[8px] shrink-0 w-[72px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon11 />
      <p className="font-['Cabin:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#0a2333] text-[14px] text-center whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Save
      </p>
    </div>
  );
}

function Icon12() {
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

function Button10() {
  return (
    <div className="bg-[#0a2333] h-[36px] relative rounded-[8px] shadow-[0px_4px_6px_0px_rgba(28,57,142,0.1),0px_2px_4px_0px_rgba(28,57,142,0.1)] shrink-0 w-[127px]" data-name="Button">
      <Icon12 />
      <p className="-translate-x-1/2 absolute font-['Cabin:Medium',sans-serif] font-medium leading-[20px] left-[75.48px] text-[14px] text-center text-white top-[7.84px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Add Widget
      </p>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Container8 />
      <Container9 />
      <Button8 />
      <Button9 />
      <Button10 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="absolute content-stretch flex gap-[24px] items-center left-[389px] top-[81px] w-[1428.86px]">
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <Frame20 />
      </div>
      <Container7 />
    </div>
  );
}

function Icon13() {
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

function Container10() {
  return (
    <div className="absolute bg-[#f1f5f9] content-stretch flex items-center justify-center left-[1051.48px] pr-[0.013px] rounded-[28197000px] size-[63.997px] top-[389px]" data-name="Container">
      <Icon13 />
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

function Icon14() {
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

function Container12() {
  return (
    <div className="bg-[#f0fdf4] relative rounded-[4px] shrink-0 size-[31.998px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.013px] relative size-full">
        <Icon14 />
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

function Container13() {
  return (
    <div className="h-[35.977px] relative shrink-0 w-[134.703px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Text1 />
        <Text2 />
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="bg-white h-[61.633px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[11.988px] items-center pl-[11.988px] relative size-full">
          <Container12 />
          <Container13 />
        </div>
      </div>
    </div>
  );
}

function Icon15() {
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

function Container14() {
  return (
    <div className="bg-[#faf5ff] relative rounded-[4px] shrink-0 size-[31.998px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pr-[0.013px] relative size-full">
        <Icon15 />
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

function Container15() {
  return (
    <div className="h-[35.977px] relative shrink-0 w-[152.705px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Text3 />
        <Text4 />
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="bg-white h-[61.633px] relative rounded-[10px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[11.988px] items-center pl-[11.988px] relative size-full">
          <Container14 />
          <Container15 />
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

function Button13() {
  return (
    <div className="bg-[rgba(10,35,51,0.05)] content-stretch flex gap-[8px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0 w-[409px]" data-name="Button">
      <LucideLayoutDashboard />
      <p className="font-['Cabin:Regular',sans-serif] font-normal leading-[21px] relative shrink-0 text-[#0a2333] text-[14px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Browse all templates
      </p>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[879px] top-[556.96px] w-[408.968px]" data-name="Container">
      <Button11 />
      <Button12 />
      <Button13 />
    </div>
  );
}

export default function Financial() {
  return (
    <div className="bg-[#f9fafb] relative size-full" data-name="Financial">
      <TopBar />
      <Frame17 />
      <Frame19 />
      <Container10 />
      <p className="-translate-x-1/2 absolute font-['Cabin:Bold',sans-serif] font-bold leading-[28px] left-[1083.78px] text-[#0a2333] text-[18px] text-center top-[468.51px] whitespace-nowrap" style={{ fontVariationSettings: "'wdth' 100" }}>
        Build your dashboard
      </p>
      <Paragraph />
      <Container11 />
    </div>
  );
}