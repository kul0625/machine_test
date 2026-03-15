import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ApiService } from "../../core/services/api.service";
import { Router } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { HierarchyComponent } from "../hierarchy/hierarchy.component";

@Component({
  selector: "app-users",
  standalone: true,
  imports: [CommonModule, FormsModule, HierarchyComponent],
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  name = "";
  username = "";
  password = "";

  receiverId = "";
  amount = 0;
  editUserId = "";
  newPassword = "";
  confirmPassword = "";
  editMessage = "";
  editError = "";

  adminNextLevelUsers: any[] = [];
  selectedHierarchyUserId = "";
  hierarchyTree: any = null;

  adminCreditTargetId = "";
  adminCreditAmount = 0;
  adminCreditMessage = "";
  adminCreditError = "";

  balanceSummaryUsers: any[] = [];
  totalSystemBalance = 0;

  constructor(
    public auth: AuthService,
    private api: ApiService,
    private router: Router,
  ) {}
  get canUseAdminFeatures(): boolean {
    return this.auth.user?.role === "ADMIN";
  }
  ngOnInit(): void {
    if (this.canUseAdminFeatures) {
      this.loadNextLevelUsers();
      this.loadBalanceSummary();
    } else {
      this.loadUsers();
      this.loginUserDownline();
    }
  }

  backtodash(): void {
    this.router.navigateByUrl("/dashboard");
  }

  loadUsers(): void {
    this.api.nextLevelUsers().subscribe((res: any) => {
      this.users = res.users || [];
      if (!this.users.find((u) => u._id === this.receiverId))
        this.receiverId = "";
      if (!this.users.find((u) => u._id === this.editUserId))
        this.editUserId = "";
    });
  }

  createUser(): void {
    const payload = {
      name: this.name,
      username: this.username,
      password: this.password,
    };

    this.api.createUser(payload).subscribe(() => {
      this.name = "";
      this.username = "";
      this.password = "";
      this.loadUsers();
      if (this.canUseAdminFeatures) {
        this.loadNextLevelUsers();
        this.loadBalanceSummary();
      }
    });
  }
  updateUserPassword(): void {
    this.editMessage = "";
    this.editError = "";

    if (!this.editUserId) {
      this.editError = "Please select a user.";
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      this.editError = "Passwords do not match.";
      return;
    }

    this.api
      .changeUserPassword(this.editUserId, { newPassword: this.newPassword })
      .subscribe({
        next: () => {
          this.editMessage = "Password updated successfully.";
          this.newPassword = "";
          this.confirmPassword = "";
        },
        error: (err) => {
          this.editError = err?.error?.message || "Unable to update password.";
        },
      });
  }
  loginUserDownline(): void {
    this.api.downline(this.auth?.user?._id).subscribe((res) => {
      this.hierarchyTree = res.tree;
    });
  }
  loadNextLevelUsers(): void {
    this.api.adminNextLevelUsers().subscribe((res) => {
      this.adminNextLevelUsers = res.users;
      if (
        !this.adminNextLevelUsers.find(
          (u) => u._id === this.selectedHierarchyUserId,
        )
      )
        this.selectedHierarchyUserId = "";
    });
  }
  transfer(): void {
    const payload = {
      receiverId: this.receiverId,
      amount: Number(this.amount),
    };

    this.api.transfer(payload).subscribe(() => {
      this.amount = 0;
    });
  }
  loadHierarchy(): void {
    if (!this.selectedHierarchyUserId) return;
    this.api.adminHierarchy(this.selectedHierarchyUserId).subscribe((res) => {
      this.hierarchyTree = res.tree;
      this.adminCreditTargetId = "";
      this.adminCreditAmount = 0;
      this.adminCreditMessage = "";
      this.adminCreditError = "";
    });
  }
  flattenTree(node: any): any[] {
    if (!node) return [];
    const children = Array.isArray(node.children) ? node.children : [];
    return [node, ...children.flatMap((child: any) => this.flattenTree(child))];
  }

  get hierarchyTargets(): any[] {
    return this.flattenTree(this.hierarchyTree).filter((u) => !!u.parentId && u?._id !== this?.selectedHierarchyUserId);
  }
  creditInHierarchy(): void {
    this.adminCreditMessage = "";
    this.adminCreditError = "";

    if (!this.adminCreditTargetId) {
      this.adminCreditError = "Please select a hierarchy user to credit.";
      return;
    }

    if (Number(this.adminCreditAmount) <= 0) {
      this.adminCreditError = "Amount must be greater than 0.";
      return;
    }

    this.api
      .adminCredit(this.adminCreditTargetId, {
        amount: Number(this.adminCreditAmount),
      })
      .subscribe({
        next: (res) => {
          this.adminCreditMessage = `${res.message}. Parent debited: ${res.parentDebited}.`;
          this.adminCreditAmount = 0;
          if (this.selectedHierarchyUserId) this.loadHierarchy();
          this.loadBalanceSummary();
        },
        error: (err) => {
          this.adminCreditError =
            err?.error?.message || "Unable to credit hierarchy user.";
        },
      });
  }

  loadBalanceSummary(): void {
    this.api.adminBalanceSummary().subscribe((res) => {
      this.totalSystemBalance = res.totalSystemBalance;
      this.balanceSummaryUsers = res.users;
    });
  }
}
