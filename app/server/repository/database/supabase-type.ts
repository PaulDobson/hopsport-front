export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      Attendance: {
        Row: {
          classId: string;
          created_at: string | null;
          date: string;
          id: string;
          memberId: string;
          updated_at: string | null;
        };
        Insert: {
          classId: string;
          created_at?: string | null;
          date: string;
          id?: string;
          memberId: string;
          updated_at?: string | null;
        };
        Update: {
          classId?: string;
          created_at?: string | null;
          date?: string;
          id?: string;
          memberId?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Attendance_classId_fkey";
            columns: ["classId"];
            isOneToOne: false;
            referencedRelation: "Class";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Attendance_memberId_fkey";
            columns: ["memberId"];
            isOneToOne: false;
            referencedRelation: "Member";
            referencedColumns: ["id"];
          }
        ];
      };
      Class: {
        Row: {
          created_at: string | null;
          date: string;
          endTime: string;
          id: string;
          instructorId: string;
          sportsDisciplineId: string;
          startTime: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          date: string;
          endTime: string;
          id?: string;
          instructorId: string;
          sportsDisciplineId: string;
          startTime: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          date?: string;
          endTime?: string;
          id?: string;
          instructorId?: string;
          sportsDisciplineId?: string;
          startTime?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Class_instructorId_fkey";
            columns: ["instructorId"];
            isOneToOne: false;
            referencedRelation: "Instructor";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Class_sportsDisciplineId_fkey";
            columns: ["sportsDisciplineId"];
            isOneToOne: false;
            referencedRelation: "SportsDiscipline";
            referencedColumns: ["id"];
          }
        ];
      };
      Event: {
        Row: {
          description: string;
          eventDate: string;
          gymId: string;
          id: number;
          subtitle: string;
          title: string;
        };
        Insert: {
          description: string;
          eventDate: string;
          gymId: string;
          id?: number;
          subtitle: string;
          title: string;
        };
        Update: {
          description?: string;
          eventDate?: string;
          gymId?: string;
          id?: number;
          subtitle?: string;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "Event_gymId_fkey";
            columns: ["gymId"];
            isOneToOne: false;
            referencedRelation: "Gym";
            referencedColumns: ["id"];
          }
        ];
      };
      EventAttendanceConfirmation: {
        Row: {
          eventId: number;
          id: number;
          memberId: string;
          status: Database["public"]["Enums"]["AttendanceStatus"];
        };
        Insert: {
          eventId: number;
          id?: number;
          memberId: string;
          status: Database["public"]["Enums"]["AttendanceStatus"];
        };
        Update: {
          eventId?: number;
          id?: number;
          memberId?: string;
          status?: Database["public"]["Enums"]["AttendanceStatus"];
        };
        Relationships: [
          {
            foreignKeyName: "EventAttendanceConfirmation_eventId_fkey";
            columns: ["eventId"];
            isOneToOne: false;
            referencedRelation: "Event";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "EventAttendanceConfirmation_memberId_fkey";
            columns: ["memberId"];
            isOneToOne: false;
            referencedRelation: "Member";
            referencedColumns: ["id"];
          }
        ];
      };
      EventComment: {
        Row: {
          content: string;
          createdAt: string;
          eventId: number;
          id: number;
          memberId: string;
        };
        Insert: {
          content: string;
          createdAt?: string;
          eventId: number;
          id?: number;
          memberId: string;
        };
        Update: {
          content?: string;
          createdAt?: string;
          eventId?: number;
          id?: number;
          memberId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "EventComment_eventId_fkey";
            columns: ["eventId"];
            isOneToOne: false;
            referencedRelation: "Event";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "EventComment_memberId_fkey";
            columns: ["memberId"];
            isOneToOne: false;
            referencedRelation: "Member";
            referencedColumns: ["id"];
          }
        ];
      };
      EventImage: {
        Row: {
          eventId: number;
          id: number;
          url: string;
        };
        Insert: {
          eventId: number;
          id?: number;
          url: string;
        };
        Update: {
          eventId?: number;
          id?: number;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: "EventImage_eventId_fkey";
            columns: ["eventId"];
            isOneToOne: false;
            referencedRelation: "Event";
            referencedColumns: ["id"];
          }
        ];
      };
      EventLike: {
        Row: {
          eventId: number;
          id: number;
          memberId: string;
        };
        Insert: {
          eventId: number;
          id?: number;
          memberId: string;
        };
        Update: {
          eventId?: number;
          id?: number;
          memberId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "EventLike_eventId_fkey";
            columns: ["eventId"];
            isOneToOne: false;
            referencedRelation: "Event";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "EventLike_memberId_fkey";
            columns: ["memberId"];
            isOneToOne: false;
            referencedRelation: "Member";
            referencedColumns: ["id"];
          }
        ];
      };
      Gym: {
        Row: {
          address: string | null;
          avatar_url: string | null;
          country: string | null;
          created_at: string | null;
          description: string | null;
          id: string;
          name: string;
          phone: string | null;
          updated_at: string | null;
        };
        Insert: {
          address?: string | null;
          avatar_url?: string | null;
          country?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name: string;
          phone?: string | null;
          updated_at?: string | null;
        };
        Update: {
          address?: string | null;
          avatar_url?: string | null;
          country?: string | null;
          created_at?: string | null;
          description?: string | null;
          id?: string;
          name?: string;
          phone?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      Instructor: {
        Row: {
          avatar_url: string | null;
          created_at: string | null;
          email: string;
          firstName: string;
          gymId: string;
          id: string;
          lastName: string;
          phone: string;
          roleId: number;
          updated_at: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string | null;
          email: string;
          firstName: string;
          gymId: string;
          id?: string;
          lastName: string;
          phone: string;
          roleId: number;
          updated_at?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string | null;
          email?: string;
          firstName?: string;
          gymId?: string;
          id?: string;
          lastName?: string;
          phone?: string;
          roleId?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Instructor_gymId_fkey";
            columns: ["gymId"];
            isOneToOne: false;
            referencedRelation: "Gym";
            referencedColumns: ["id"];
          }
        ];
      };
      invitation: {
        Row: {
          acepted: boolean | null;
          acepted_at: string | null;
          code: string | null;
          created_at: string | null;
          email: string;
          id: number;
          name: string | null;
          role_id: number | null;
        };
        Insert: {
          acepted?: boolean | null;
          acepted_at?: string | null;
          code?: string | null;
          created_at?: string | null;
          email: string;
          id?: never;
          name?: string | null;
          role_id?: number | null;
        };
        Update: {
          acepted?: boolean | null;
          acepted_at?: string | null;
          code?: string | null;
          created_at?: string | null;
          email?: string;
          id?: never;
          name?: string | null;
          role_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "invitation_role_id_fkey";
            columns: ["role_id"];
            isOneToOne: false;
            referencedRelation: "Role";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "invitation_role_id_fkey";
            columns: ["role_id"];
            isOneToOne: false;
            referencedRelation: "role_permission_view";
            referencedColumns: ["role_id"];
          }
        ];
      };
      Member: {
        Row: {
          address: string | null;
          avatar_url: string | null;
          created_at: string | null;
          dateOfBirth: string;
          email: string;
          firstName: string;
          gymId: string;
          id: string;
          lastName: string;
          phone: string;
          roleId: number;
          updated_at: string | null;
        };
        Insert: {
          address?: string | null;
          avatar_url?: string | null;
          created_at?: string | null;
          dateOfBirth: string;
          email: string;
          firstName: string;
          gymId: string;
          id?: string;
          lastName: string;
          phone: string;
          roleId: number;
          updated_at?: string | null;
        };
        Update: {
          address?: string | null;
          avatar_url?: string | null;
          created_at?: string | null;
          dateOfBirth?: string;
          email?: string;
          firstName?: string;
          gymId?: string;
          id?: string;
          lastName?: string;
          phone?: string;
          roleId?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Member_gymId_fkey";
            columns: ["gymId"];
            isOneToOne: false;
            referencedRelation: "Gym";
            referencedColumns: ["id"];
          }
        ];
      };
      Membership: {
        Row: {
          created_at: string | null;
          endDate: string;
          id: string;
          memberId: string;
          planId: string;
          startDate: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          endDate: string;
          id?: string;
          memberId: string;
          planId: string;
          startDate: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          endDate?: string;
          id?: string;
          memberId?: string;
          planId?: string;
          startDate?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Membership_memberId_fkey";
            columns: ["memberId"];
            isOneToOne: false;
            referencedRelation: "Member";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Membership_planId_fkey";
            columns: ["planId"];
            isOneToOne: false;
            referencedRelation: "Plan";
            referencedColumns: ["id"];
          }
        ];
      };
      Payment: {
        Row: {
          amount: number;
          created_at: string | null;
          id: string;
          memberId: string;
          membershipId: string;
          paymentDate: string;
          paymentMethod: string;
          updated_at: string | null;
        };
        Insert: {
          amount: number;
          created_at?: string | null;
          id?: string;
          memberId: string;
          membershipId: string;
          paymentDate: string;
          paymentMethod: string;
          updated_at?: string | null;
        };
        Update: {
          amount?: number;
          created_at?: string | null;
          id?: string;
          memberId?: string;
          membershipId?: string;
          paymentDate?: string;
          paymentMethod?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Payment_memberId_fkey";
            columns: ["memberId"];
            isOneToOne: false;
            referencedRelation: "Member";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Payment_membershipId_fkey";
            columns: ["membershipId"];
            isOneToOne: false;
            referencedRelation: "Membership";
            referencedColumns: ["id"];
          }
        ];
      };
      Permission: {
        Row: {
          description: string | null;
          id: number;
          name: string;
        };
        Insert: {
          description?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          description?: string | null;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      Plan: {
        Row: {
          created_at: string | null;
          description: string;
          duration: number;
          gymId: string;
          id: string;
          name: string;
          price: number;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          description: string;
          duration: number;
          gymId: string;
          id?: string;
          name: string;
          price: number;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          description?: string;
          duration?: number;
          gymId?: string;
          id?: string;
          name?: string;
          price?: number;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "Plan_gymId_fkey";
            columns: ["gymId"];
            isOneToOne: false;
            referencedRelation: "Gym";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          email: string | null;
          full_name: string | null;
          gym_id: string | null;
          id: string;
          role_id: number | null;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          email?: string | null;
          full_name?: string | null;
          gym_id?: string | null;
          id: string;
          role_id?: number | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          email?: string | null;
          full_name?: string | null;
          gym_id?: string | null;
          id?: string;
          role_id?: number | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_role_id_fkey";
            columns: ["role_id"];
            isOneToOne: false;
            referencedRelation: "Role";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "profiles_role_id_fkey";
            columns: ["role_id"];
            isOneToOne: false;
            referencedRelation: "role_permission_view";
            referencedColumns: ["role_id"];
          }
        ];
      };
      Role: {
        Row: {
          description: string | null;
          id: number;
          name: string;
        };
        Insert: {
          description?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          description?: string | null;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      Role_Permission: {
        Row: {
          permissionId: number;
          roleId: number;
        };
        Insert: {
          permissionId: number;
          roleId: number;
        };
        Update: {
          permissionId?: number;
          roleId?: number;
        };
        Relationships: [
          {
            foreignKeyName: "Role_Permission_permissionId_fkey";
            columns: ["permissionId"];
            isOneToOne: false;
            referencedRelation: "Permission";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Role_Permission_permissionId_fkey";
            columns: ["permissionId"];
            isOneToOne: false;
            referencedRelation: "role_permission_view";
            referencedColumns: ["permission_id"];
          },
          {
            foreignKeyName: "Role_Permission_roleId_fkey";
            columns: ["roleId"];
            isOneToOne: false;
            referencedRelation: "Role";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "Role_Permission_roleId_fkey";
            columns: ["roleId"];
            isOneToOne: false;
            referencedRelation: "role_permission_view";
            referencedColumns: ["role_id"];
          }
        ];
      };
      SportsDiscipline: {
        Row: {
          avatar_url: string | null;
          created_at: string | null;
          description: string;
          gymId: string;
          id: string;
          name: string;
          updated_at: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string | null;
          description: string;
          gymId: string;
          id?: string;
          name: string;
          updated_at?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string | null;
          description?: string;
          gymId?: string;
          id?: string;
          name?: string;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "SportsDiscipline_gymId_fkey";
            columns: ["gymId"];
            isOneToOne: false;
            referencedRelation: "Gym";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      role_permission_view: {
        Row: {
          permission_id: number | null;
          permission_name: string | null;
          role_id: number | null;
          role_name: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      get_current_user_role: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      get_user_profile: {
        Args: {
          user_id: number;
        };
        Returns: {
          id: number;
          username: string;
          email: string;
          created_at: string;
        }[];
      };
    };
    Enums: {
      AttendanceStatus: "CONFIRMED" | "MAYBE" | "DECLINED";
      payment_method_enum:
        | "credit_card"
        | "debit_card"
        | "cash"
        | "bank_transfer";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;
