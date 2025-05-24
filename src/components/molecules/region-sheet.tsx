import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { AllRegionProps } from "@/lib/region-type";

type RegionSheetProps = {
  data: AllRegionProps;
};

export function RegionSheet({ data }: RegionSheetProps) {
  const { provinsi, kabupaten, kecamatan, desa } = data;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-white text-black hover:bg-gray-300 hover:cursor-pointer">
          See all region
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>All Region</SheetTitle>
          <SheetDescription>See all region list here</SheetDescription>

          <div className="mt-6 h-screen overflow-y-auto pr-2">
            {provinsi.map((prov) => (
              <div key={prov.id} className="mb-6">
                <div className="font-bold text-xl text-primary">
                  {prov.provinsi}
                </div>

                {kabupaten
                  .filter((kab) => kab.prov_id === prov.id)
                  .map((kab) => (
                    <div
                      key={kab.id}
                      className="ml-4 mt-2 border-l-2 border-border pl-4"
                    >
                      <div className="text-base font-semibold text-foreground">
                        {kab.kabupaten}
                      </div>

                      {kecamatan
                        .filter((kec) => kec.kab_id === kab.id)
                        .map((kec) => (
                          <div
                            key={kec.id}
                            className="ml-4 mt-2 border-l-2 border-muted pl-4"
                          >
                            <div className="text-sm font-medium text-foreground">
                              {kec.kecamatan}
                            </div>

                            {desa
                              .filter((d) => d.kec_id === kec.id)
                              .map((d) => (
                                <div
                                  key={d.id}
                                  className="ml-4 mt-1 text-sm text-muted-foreground"
                                >
                                  • {d.desa}
                                </div>
                              ))}
                          </div>
                        ))}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
