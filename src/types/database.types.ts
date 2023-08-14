export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      car_checks: {
        Row: {
          car_license_plate: string;
          id: number;
          name: string;
        };
        Insert: {
          car_license_plate: string;
          id?: number;
          name: string;
        };
        Update: {
          car_license_plate?: string;
          id?: number;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "car_checks_car_license_plate_fkey";
            columns: ["car_license_plate"];
            referencedRelation: "cars";
            referencedColumns: ["license_plate"];
          }
        ];
      };
      cars: {
        Row: {
          last_checked: string | null;
          license_plate: string;
          model: string;
        };
        Insert: {
          last_checked?: string | null;
          license_plate: string;
          model?: string;
        };
        Update: {
          last_checked?: string | null;
          license_plate?: string;
          model?: string;
        };
        Relationships: [];
      };
      user_check_list: {
        Row: {
          completed: boolean;
          created_at: string;
          finished_at: string | null;
          first_name: string;
          id: string;
          last_name: string;
          license_plate: string;
        };
        Insert: {
          completed?: boolean;
          created_at?: string;
          finished_at?: string | null;
          first_name: string;
          id?: string;
          last_name: string;
          license_plate: string;
        };
        Update: {
          completed?: boolean;
          created_at?: string;
          finished_at?: string | null;
          first_name?: string;
          id?: string;
          last_name?: string;
          license_plate?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_check_list_license_plate_fkey";
            columns: ["license_plate"];
            referencedRelation: "cars";
            referencedColumns: ["license_plate"];
          }
        ];
      };
      user_checks: {
        Row: {
          check_id: number;
          checked: boolean;
          checklist_id: string;
          description: string;
          id: number;
          name: string;
        };
        Insert: {
          check_id: number;
          checked?: boolean;
          checklist_id: string;
          description: string;
          id?: number;
          name: string;
        };
        Update: {
          check_id?: number;
          checked?: boolean;
          checklist_id?: string;
          description?: string;
          id?: number;
          name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_checks_check_id_fkey";
            columns: ["check_id"];
            referencedRelation: "car_checks";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_checks_checklist_id_fkey";
            columns: ["checklist_id"];
            referencedRelation: "user_check_list";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type CarRelation = Database["public"]["Tables"]["cars"]["Row"] & {
  car_checks: Database["public"]["Tables"]["car_checks"]["Row"][];
};
