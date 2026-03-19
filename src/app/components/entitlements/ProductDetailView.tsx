import { ArrowLeft, ExternalLink, Plane, Building2, Sofa, Car, UtensilsCrossed, Zap, Smartphone, Ticket, Heart, Globe, DollarSign, Star, TrendingUp, Shield, MapPin, Clock, Users, CreditCard, Calendar } from 'lucide-react';
import { CATALOG_PRODUCTS } from './catalogData';
import type { Product } from '../../types/portalTypes';

const iconMap: Record<string, React.ElementType> = {
  Plane, Building2, Sofa, Car, UtensilsCrossed, Zap, Smartphone, Ticket, Heart,
  Globe, DollarSign, Star, TrendingUp, Shield, MapPin, Clock, Users, CreditCard, Calendar,
};

const statusStyles: Record<string, string> = {
  active: 'bg-[#dcfce7] text-[#166534]',
  available: 'bg-[#f3f4f6] text-[#374151]',
  requested: 'bg-[#FEF3C7] text-[#92400E]',
};

const statusLabels: Record<string, string> = {
  active: 'ACTIVE',
  available: 'AVAILABLE',
  requested: 'REQUESTED',
};

interface ProductDetailViewProps {
  slug: string;
  onBack: () => void;
  backLabel?: string;
}

export function ProductDetailView({ slug, onBack, backLabel = 'Back to Categories' }: ProductDetailViewProps) {
  const product = CATALOG_PRODUCTS.find(p => p.slug === slug);
  if (!product) return null;

  const ProductIcon = iconMap[product.icon] || Plane;

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-3xl mx-auto px-8 py-6">
        {/* Back link */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 font-['Cabin',sans-serif] text-[13px] text-[#6a7282] hover:text-[#0a2333] transition-colors mb-6"
        >
          <ArrowLeft size={14} />
          {backLabel}
        </button>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#f1f5f9] flex items-center justify-center">
              <ProductIcon size={22} className="text-[#0a2333]" />
            </div>
            <div>
              <h1 className="font-['Cabin',sans-serif] font-bold text-[22px] text-[#0a2333]">
                {product.name}
              </h1>
              <p className="font-['Cabin',sans-serif] text-[13px] text-[#6a7282]">{product.shortDescription}</p>
            </div>
          </div>
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold font-['Cabin',sans-serif] ${statusStyles[product.clientStatus]}`}>
            {statusLabels[product.clientStatus]}
          </span>
        </div>

        <div className="h-px bg-[#e5e7eb] mb-8" />

        {/* Overview */}
        <section className="mb-8">
          <h2 className="font-['Cabin',sans-serif] font-bold text-[16px] text-[#0a2333] mb-3">Overview</h2>
          <p className="font-['Cabin',sans-serif] text-[14px] text-[#45556c] leading-relaxed">
            {product.fullDescription}
          </p>
        </section>

        {/* Key Benefits */}
        <section className="mb-8">
          <h2 className="font-['Cabin',sans-serif] font-bold text-[16px] text-[#0a2333] mb-4">Key Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {product.benefits.map((benefit, i) => {
              const BenefitIcon = iconMap[benefit.icon] || Star;
              return (
                <div key={i} className="bg-[#f9fafb] rounded-xl border border-[#e5e7eb] p-4">
                  <div className="w-9 h-9 rounded-lg bg-white border border-[#e5e7eb] flex items-center justify-center mb-3">
                    <BenefitIcon size={16} className="text-[#0a2333]" />
                  </div>
                  <h4 className="font-['Cabin',sans-serif] font-semibold text-[13px] text-[#0a2333] mb-1">
                    {benefit.title}
                  </h4>
                  <p className="font-['Cabin',sans-serif] text-[12px] text-[#6a7282] leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Integration Guide */}
        <section className="mb-8">
          <h2 className="font-['Cabin',sans-serif] font-bold text-[16px] text-[#0a2333] mb-3">Integration Guide</h2>
          <div className="bg-[#f9fafb] rounded-xl border border-[#e5e7eb] p-5">
            <p className="font-['Cabin',sans-serif] text-[13px] text-[#45556c] leading-relaxed">
              {product.integrationGuide}
            </p>
          </div>
        </section>

        {/* CTA row */}
        <div className="flex items-center gap-4 pt-2 pb-8">
          <button
            onClick={() => window.open(product.documentationUrl, '_blank')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#e5e7eb] font-['Cabin',sans-serif] font-medium text-[13px] text-[#0a2333] hover:bg-[#f9fafb] transition-colors"
          >
            View API Documentation
            <ExternalLink size={13} />
          </button>

          {product.clientStatus === 'available' && (
            <button className="px-4 py-2.5 rounded-lg bg-[#0a2333] text-white font-['Cabin',sans-serif] font-medium text-[13px] hover:bg-[#152c3c] transition-colors">
              Request This Product
            </button>
          )}
          {product.clientStatus === 'active' && (
            <button
              onClick={onBack}
              className="px-4 py-2.5 rounded-lg bg-[#0a2333] text-white font-['Cabin',sans-serif] font-medium text-[13px] hover:bg-[#152c3c] transition-colors"
            >
              Manage Entitlements
            </button>
          )}
          {product.clientStatus === 'requested' && (
            <button
              disabled
              className="px-4 py-2.5 rounded-lg bg-[#D97706]/20 text-[#92400E] font-['Cabin',sans-serif] font-medium text-[13px] cursor-not-allowed opacity-70"
            >
              Requested — Pending Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
