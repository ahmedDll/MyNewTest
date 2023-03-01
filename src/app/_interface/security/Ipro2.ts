export interface Ipro2 {
      progId: number;
      parentId: number | null;
      arabicName: string;
      latinName: string;
      description: string;
      formName: string;
      parameters: string;
      url: string;
      haveInsert: boolean | null;
      haveEdit: boolean | null;
      haveRead: boolean | null;
      haveDelete: boolean | null;
      havePrint: boolean | null;
  }