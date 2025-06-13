export default function Legend() {
  return (
    <div className="absolute z-20 right-2 top-2 flex flex-col gap-2">
      <div className="bg-background w-[160px] h-fit px-2 rounded-sm py-2 flex flex-col gap-2 border border-gray-600">
        <div className="flex gap-2 items-center">
          <div className="w-[20px] h-[20px] bg-blue-600" />
          <div className="font-semibold text-sm"> Jalan Provinsi</div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-[20px] h-[20px] bg-green-700" />
          <div className="font-semibold text-sm"> Jalan Kabupaten</div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="w-[20px] h-[20px] bg-red-500" />
          <div className="font-semibold text-sm"> Jalan Desa</div>
        </div>
      </div>

      <div className="bg-background w-[160px] h-fit px-2 rounded-sm py-2 flex flex-col gap-2 border border-gray-600">
        <div className="flex gap-2 items-center">
          <svg width="40" height="10">
            <line x1="0" y1="5" x2="40" y2="5" stroke="white" strokeWidth="4" />
          </svg>
          <div className="font-semibold text-sm">Baik</div>
        </div>

        <div className="flex gap-2 items-center">
          <svg width="40" height="10">
            <line
              x1="0"
              y1="5"
              x2="40"
              y2="5"
              stroke="white"
              strokeWidth="4"
              strokeDasharray="8 8"
            />
          </svg>
          <div className="font-semibold text-sm">Sedang</div>
        </div>

        <div className="flex gap-2 items-center">
          <svg width="40" height="10">
            <line
              x1="0"
              y1="5"
              x2="40"
              y2="5"
              stroke="white"
              strokeWidth="4"
              strokeDasharray="4 4"
            />
          </svg>
          <div className="font-semibold text-sm">Rusak</div>
        </div>
      </div>
    </div>
  );
}
