import React, { useState } from 'react';
import { Check, Copy, ExternalLink, X } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface WhatsAppModalProps {
  isOpen: boolean;
  subject: string;
  initialMessage: string;
  onClose: () => void;
}

const VILLAGE_WHATSAPP_NUMBER = '6281234567890';

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  subject,
  initialMessage,
  onClose,
}) => {
  const [message, setMessage] = useState(initialMessage);
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    setMessage(initialMessage);
    setCopied(false);
  }, [initialMessage, isOpen]);

  if (!isOpen) return null;

  const waHref = `https://wa.me/${VILLAGE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#1C2820]/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wa-modal-title"
    >
      <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl highland-shadow overflow-hidden">
        <div className="p-5 bg-[#1E4B38] text-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shrink-0">
              <WhatsAppIcon className="w-5 h-5 text-white" />
            </span>
            <div>
              <h2 id="wa-modal-title" className="text-base font-bold">
                Koordinator Desa WhatsApp
              </h2>
              <p className="text-xs text-[#BDEDD3]">{subject}</p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Tutup jendela WhatsApp"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-sm text-[#414944]">
            Sesuaikan pesan di bawah ini sebelum mengirim langsung ke Kang Dedi dan meja tuan rumah Lereng Asri (umumnya dibalas dalam 15 menit, pukul 06.00–20.00 WIB).
          </p>

          <div>
            <label htmlFor="wa-message-box" className="block text-xs font-semibold text-[#023423] mb-1.5">
              Pratinjau Pesan
            </label>
            <textarea
              id="wa-message-box"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3.5 rounded-lg bg-[#F9F8F3] border-[1.5px] border-[#1C2820]/20 text-sm text-[#1C2820] focus:outline-none focus:border-[#1E4B38] focus:ring-3 focus:ring-[#1E4B38]/15"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button
              type="button"
              onClick={handleCopy}
              className="min-h-[48px] px-4 py-3 rounded-lg border-[1.5px] border-[#1E4B38] text-[#1E4B38] hover:bg-[#F9F8F3] text-sm font-semibold inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-[#1A6D0E]" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Pesan Tersalin' : 'Salin Pesan'}
            </button>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] flex-1 px-5 py-3 rounded-lg bg-[#25D366] hover:bg-[#1FB858] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Buka di WhatsApp
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
